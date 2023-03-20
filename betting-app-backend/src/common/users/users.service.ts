import { Types } from "mongoose";

import { role, statusCode } from "../../utils/globalConst";
import HttpException from "../../exceptions/HttpException";

import userModel from "./users.model";
import { ResetPassBody, User, UserDoc } from "./users.interface";
import axios from "axios";
import env from "../../configs/env.config";

let instance: null | UsersService = null;

class UsersService {
    private user = userModel;

    static getInstance(): UsersService {
        if (instance == null) {
            instance = new UsersService();
        }

        return instance;
    }

    public async createAccount(phone: string): Promise<User> {

        const foundUser: User | null = await this.user.findOne({
            phone: phone,
        }).lean();

        if (foundUser?.isPhoneVerified) {
            throw new HttpException(statusCode.CONFLICT, "Phone already taken!");
        }

        if (foundUser) {
            return foundUser;
        } else {
            const newUser: User = await this.user.create({
                phone
            });

            return newUser
        }
    }

    public async updateUser(userId: Types.ObjectId, data: any): Promise<UserDoc | null> {
        return await this.user.findOneAndUpdate(
            {
                _id: userId
            },
            {
                ...data
            },
            {
                new: true
            }
        );
    }

    public async getVerifiedUserById(userId: Types.ObjectId): Promise<UserDoc | null> {
        return await this.user.findOne(
            {
                _id: userId,
                isPhoneVerified: true
            }
        ).select({
            password: 0
        });
    }

    public async getVerfiedUserByPhone(phone: string): Promise<UserDoc | null> {
        return await this.user.findOne(
            {
                phone,
                isPhoneVerified: true
            }
        );
    }

    public async changePassword(user: UserDoc, newPassword: string): Promise<UserDoc> {
        user.password = newPassword;
        return await user.save();
    };

    public checkPassword(user: UserDoc, password: string): boolean {
        return user.comparePassword(password);
    }

    public async resetPassword(user: UserDoc, resetPassBody: ResetPassBody): Promise<void> {
        if (!this.checkPassword(user, resetPassBody.currentPassword)) {
            throw new HttpException(statusCode.UNAUTHORIZED, "Wrong password!");
        }

        await this.changePassword(user, resetPassBody.newPassword);

        return;
    }

    public async updateBalance(userId: Types.ObjectId, amount: number): Promise<User> {
        return await this.user.findOneAndUpdate(
            {
                _id: userId
            },
            {
                $inc: {
                    balance: amount
                }
            },
            {
                new: true
            }
        ).lean();
    }

    public async deductBalance(userId: Types.ObjectId, amount: number): Promise<User> {
        return await this.user.findOneAndUpdate(
            {
                _id: userId
            },
            {
                $inc: {
                    balance: -amount
                }
            },
            {
                new: true
            }
        ).lean()
    }

    public async getUsers() {
        return await this.user.find(
            {
                isPhoneVerified: true,
                role: "user"
            }
        )
            .sort({ balance: -1 })
            .lean()
            .select("phone balance email createdAt");
    }

    public async userCount(): Promise<number> {
        return await this.user.find({ role: role.user, isPhoneVerified: true }).count();
    }

    public async createRazorPayAccount(email: string, contact: string, userId: Types.ObjectId): Promise<string> {
        const nameParts = email.split("@");
        const name = nameParts.length == 2 ? nameParts[0] : "beneficiary";

        const { data }: any = await axios.post("https://api.razorpay.com/v1/contacts",
            {
                name,
                email,
                contact,
                type: "customer"
            },
            {
                auth: {
                    username: env.RAZORPAY_ID,
                    password: env.RAZORPAY_KEY_SECRET
                }
            }
        );

        await this.user.findByIdAndUpdate(userId,
            {
                contactId: data.id,
                active: true
            });

        return data.id;
    }

    public async deductBalanceByAmount(amount: number): Promise<void>{
        
    }
}

export default UsersService.getInstance();