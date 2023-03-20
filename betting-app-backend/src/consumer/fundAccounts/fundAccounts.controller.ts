import { Response, NextFunction } from "express";

import { statusCode } from "../../utils/globalConst";
import { responseHandler } from "../../utils/utils";
import HttpException from "../../exceptions/HttpException";
import env from "../../configs/env.config";
import { RequestWithUser } from "../../common/auth/auth.interface";
import { User } from "../../common/users/users.interface";
import { BankAccountBody, UPIAccountBody } from "./fundAccounts.interface";
import fundAccountsService from "./fundAccounts.service";

let instance: null | FundAccountsController = null;

class FundAccountsController {

    static getInstance(): FundAccountsController {
        if (instance == null) {
            instance = new FundAccountsController();
        }
        return instance;
    }

    public async newBankAccount(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user: User = req.user!;
            const bankAccountBody: BankAccountBody = req.body;

            await fundAccountsService.newBankAccount(bankAccountBody, user);

            return res
                .status(statusCode.OK)
                .json(responseHandler(null, statusCode.OK, 'success'));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async newUPIAccount(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user: User = req.user!;
            const upiAccountBody: UPIAccountBody = req.body;

            await fundAccountsService.newUPIAccount(upiAccountBody.address, user);

            return res
                .status(statusCode.OK)
                .json(responseHandler(null, statusCode.OK, 'success'));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async getAllAccounts(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user: User = req.user!;
            const allAccounts = await fundAccountsService.getAllAccounts(user._id!);

            return res
                .status(statusCode.OK)
                .json(responseHandler(allAccounts, statusCode.OK, 'success'));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default FundAccountsController.getInstance();