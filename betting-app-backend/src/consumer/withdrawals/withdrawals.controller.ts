import { Response, NextFunction } from "express";
import { Types } from "mongoose";

import { statusCode } from "../../utils/globalConst";
import { responseHandler } from "../../utils/utils";
import HttpException from "../../exceptions/HttpException";
import env from "../../configs/env.config";
import { RequestWithUser } from "../../common/auth/auth.interface";
import { User } from "../../common/users/users.interface";

import withdrawalsService from "./withdrawals.service";


let instance: null | FundAccountsController = null;

class FundAccountsController {

    static getInstance(): FundAccountsController {
        if (instance == null) {
            instance = new FundAccountsController();
        }
        return instance;
    }

    public async withdrawMoney(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user: User = req.user!;
            const { amount, accountId } = req.body as unknown as { amount: number, accountId: Types.ObjectId };

            if (user.balance < amount) {
                throw new HttpException(statusCode.BAD_REQUEST, "Insufficient Balance!");
            }

            await withdrawalsService.withdraw(user._id!, amount, accountId);

            return res
                .status(statusCode.OK)
                .json(responseHandler(null, statusCode.OK, 'success'));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async withdrawHistory(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user: User = req.user!;

            const withdrawHistory = await withdrawalsService.withdrawHistory(user._id!);

            return res
                .status(statusCode.OK)
                .json(responseHandler(withdrawHistory, statusCode.OK, 'success'));
        }
        catch (error) {
            console.log(error);

        }
    }
}

export default FundAccountsController.getInstance();