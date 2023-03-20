import { Router } from "express";

import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";

import Route from "../../common/interface/routes.interface";
import fundAccountsController from "./fundAccounts.controller";
import { bankAccountBodyDto, upiAccountBodyDto } from "./fundAccounts.dto";

class FundAccountsRoute implements Route {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(authMiddleware());
        this.router.get('/', fundAccountsController.getAllAccounts);
        this.router.post('/newBankAccount', bankAccountBodyDto, validationMiddleware, fundAccountsController.newBankAccount);
        this.router.post('/newUPIAccount', upiAccountBodyDto, validationMiddleware, fundAccountsController.newUPIAccount);
    }
}

export default FundAccountsRoute;
