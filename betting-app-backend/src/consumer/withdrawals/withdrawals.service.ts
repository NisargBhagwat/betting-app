import { Types } from "mongoose";
import { User } from "../../common/users/users.interface";
import axios from "axios";

import HttpException from "../../exceptions/HttpException";

import usersService from "../../common/users/users.service";
import env from "../../configs/env.config";

import withdrawalModel from "./withdrawals.model";
import fundAccountsService from "../fundAccounts/fundAccounts.service";
import { accountTypes, statusCode } from "../../utils/globalConst";
import { FundAccount } from "../fundAccounts/fundAccounts.interface";
import { deduct2Per, twoPerOfValue } from "../../utils/utils";

let instance: null | FundAccountsService = null;

class FundAccountsService {
    private Widhrawal = withdrawalModel;

    static getInstance(): FundAccountsService {
        if (instance == null) {
            instance = new FundAccountsService();
        }

        return instance;
    }

    public async withdraw(userId: Types.ObjectId, amount: number, accountId: Types.ObjectId): Promise<any> {
        const accountInfo: FundAccount | null = await fundAccountsService.getFundAccountById(userId, accountId);

        if (!accountInfo) {
            throw new HttpException(statusCode.NOT_FOUND, "account not found!");
        }

        const { data }: any = await axios.post("https://api.razorpay.com/v1/payouts",
            {
                account_number: env.RAZORPAY_ACCOUNT_NO,
                fund_account_id: accountInfo.accountId,
                amount: deduct2Per(amount) * 100,
                currency: "INR",
                mode: accountInfo.accountType == accountTypes.bank_account ? "IMPS" : "UPI",
                purpose: "payout",
                queue_if_low_balance: false
            },
            {
                auth: {
                    username: env.RAZORPAY_ID,
                    password: env.RAZORPAY_KEY_SECRET
                }
            }
        );

        await this.Widhrawal.create({
            user: userId,
            payOutId: data.id,
            amount,
            fee: twoPerOfValue(amount)
        });

        await usersService.deductBalance(userId, amount);
    }

    public async withdrawHistory(userId: Types.ObjectId): Promise<any> {
        return this.Widhrawal.find(
            { user: userId },
            {
                amount: 1,
                fee: 1,
                createdAt: 1
            }
        ).sort({ createdAt: -1 });
    }
}

export default FundAccountsService.getInstance();