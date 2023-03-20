import { Types } from "mongoose";
import { createHmac } from "crypto";

import HttpException from "../../exceptions/HttpException";
import env from "../../configs/env.config";
import { statusCode, transactionStatus } from "../../utils/globalConst";

import transactionModel from "./payment.model";
import usersService from "../../common//users/users.service"
import { Transaction, TransactionDoc, TxnTokenResBody, VerificationBody } from "./payment.interface";
import { deduct2Per, stringToNumber, twoPerOfValue } from "../../utils/utils";
import { razorpay } from "../../utils/razorpay";

let instance: null | PaymentService = null;

class PaymentService {
    private transaction = transactionModel

    static getInstance(): PaymentService {
        if (instance == null) {
            instance = new PaymentService();
        }

        return instance;
    }

    public async createNewTransaction(userId: Types.ObjectId): Promise<TransactionDoc> {
        return await this.transaction.create({
            user: userId
        });
    }

    public async getTransactionById(orderId: Types.ObjectId): Promise<Transaction> {
        return await this.transaction.findOne({
            _id: orderId
        }).lean();
    }

    public async updateTransactionById(orderId: Types.ObjectId, data: Object): Promise<Transaction> {
        return await this.transaction.findOneAndUpdate(
            {
                _id: orderId
            },
            {
                ...data
            },
            {
                new: true
            }
        ).lean();
    }

    public async completeTranaction(orderId: Types.ObjectId, transactionData: any): Promise<any> {

        if (transactionData.STATUS != transactionStatus.success) {
            // throw error for failed transaction 
            this.updateTransactionById(
                orderId,
                {
                    isCompleted: true,
                    ...transactionData
                });
            throw new HttpException(statusCode.BAD_REQUEST, transactionData.RESPMSG);
        }

        // update transaction data 
        const updatedData: Transaction = await this.updateTransactionById(
            orderId, {
            ...transactionData,
            isCompleted: true,
            fee: twoPerOfValue(transactionData.TXNAMOUNT)
        });

        const amount = deduct2Per(transactionData.TXNAMOUNT);
        // update user's balance
        const newBalanceData = await usersService.updateBalance(updatedData.user, amount);
        return {
            newBalance: newBalanceData.balance
        };
    }

    public async getAllTranasactions(userId: Types.ObjectId): Promise<any> {
        return await this.transaction.find(
            {
                user: userId,
                isCompleted: true
            }
        )
            .lean()
            .select("amount fee createdAt");
    }   

    public async getNewRazorPayOrderId(amount: number, userId: Types.ObjectId): Promise<any> {
        var options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
        };

        const order = await razorpay.orders.create(options);
        await this.transaction.create({
            user: userId,
            razorpay_order_id: order.id,
            fee: twoPerOfValue(amount),
            amount
        });

        return {
            orderId: order.id,
            amount: amount * 100
        }
    }

    public async verifyPayment(verificationBody: VerificationBody, userId: Types.ObjectId): Promise<any> {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = verificationBody;
        const transactionInfo: Transaction = await this.findInCompleteTransactiobnByOrderId(razorpay_order_id, userId);

        let body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = createHmac('sha256', env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // completeing trnsaction 
            await this.transaction.findOneAndUpdate(
                {
                    razorpay_order_id,
                    user: userId,
                    isCompleted: false
                },
                {
                    isCompleted: true,
                    razorpay_payment_id,
                    razorpay_signature
                }
            );

            // update user balance
            const deductedAmount = deduct2Per(transactionInfo.amount);
            const newBalanceData = await usersService.updateBalance(userId, deductedAmount);

            return {
                balance: newBalanceData.balance
            }
        } else {
            throw new HttpException(statusCode.BAD_REQUEST, "Transactin Failed!");
        }
    };

    public async findInCompleteTransactiobnByOrderId(razorpay_order_id: string, userId: Types.ObjectId): Promise<Transaction> {
        const transactionInfo: Transaction | null = await this.transaction.findOne({
            razorpay_order_id,
            user: userId,
            isCompleted: false
        }).lean();

        if (!transactionInfo) {
            throw new HttpException(statusCode.BAD_REQUEST, "Untrusted transaction!");
        }

        return transactionInfo;
    }
}

export default PaymentService.getInstance();