import { Types } from "mongoose";
import { User } from "../../common/users/users.interface";
import axios from "axios";

import HttpException from "../../exceptions/HttpException";
import { BankAccountBody, FundAccount, UPIAccountBody } from "./fundAccounts.interface";

import fundAccountModel from "./fundAccounts.model";
import usersService from "../../common/users/users.service";
import env from "../../configs/env.config";
import { accountTypes } from "../../utils/globalConst";

let instance: null | FundAccountsService = null;

class FundAccountsService {
    private FundAccount = fundAccountModel;

    static getInstance(): FundAccountsService {
        if (instance == null) {
            instance = new FundAccountsService();
        }

        return instance;
    }

    public async newBankAccount(bankAccountBody: BankAccountBody, user: User) {
        let contactId: string;
        if (user.contactId) {
            contactId = user.contactId;
        } else {
            contactId = await usersService.createRazorPayAccount(user.email, user.phone!, user._id!);
        }

        const { data }: any = await axios.post("https://api.razorpay.com/v1/fund_accounts",
            {
                contact_id: contactId,
                account_type: accountTypes.bank_account,
                bank_account: {
                    name: bankAccountBody.name,
                    ifsc: bankAccountBody.ifsc,
                    account_number: bankAccountBody.accountNumber
                }
            },
            {
                auth: {
                    username: env.RAZORPAY_ID,
                    password: env.RAZORPAY_KEY_SECRET
                }
            }
        );

        await this.FundAccount.create({
            user: user._id!,
            accountId: data.id,
            accountType: accountTypes.bank_account,
            accountRef: `xxxxxxxxx${bankAccountBody.accountNumber.slice(-4)}`
        });
    }

    public async newUPIAccount(address: string, user: User) {
        let contactId: string;
        if (user.contactId) {
            contactId = user.contactId;
        } else {
            contactId = await usersService.createRazorPayAccount(user.email, user.phone!, user._id!);
        }

        const { data }: any = await axios.post("https://api.razorpay.com/v1/fund_accounts",
            {
                contact_id: contactId,
                account_type: accountTypes.vpa,
                vpa: { address }
            },
            {
                auth: {
                    username: env.RAZORPAY_ID,
                    password: env.RAZORPAY_KEY_SECRET
                }
            }
        );

        await this.FundAccount.create({
            user: user._id!,
            accountId: data.id,
            accountType: accountTypes.vpa,
            accountRef: address
        });
    }

    public async getFundAccount(userId: Types.ObjectId): Promise<FundAccount | null> {
        return await this.FundAccount.findOne({ user: userId }).lean();
    }

    public async getAllAccounts(userId: Types.ObjectId): Promise<any> {
        return await this.FundAccount.find(
            {
                user: userId,
                active: true
            },
            {
                accountType: 1,
                accountRef: 1
            }
        )
    }

    public async getFundAccountById(userId: Types.ObjectId, accountId: Types.ObjectId): Promise<FundAccount | null> {
        return await this.FundAccount.findOne({
            user: userId,
            _id: accountId,
            active: true
        }).lean();
    }
}

export default FundAccountsService.getInstance();