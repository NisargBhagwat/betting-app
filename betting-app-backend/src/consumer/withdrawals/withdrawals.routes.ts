import { Router } from "express";

import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";

import Route from "../../common/interface/routes.interface";
import withdrawalsController from "./withdrawals.controller";
import { withdrawBodyDto } from "./withdrawals.dto";

class WithrawalsRoute implements Route {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(authMiddleware());
        this.router
            .route('/')
            .post(withdrawBodyDto, validationMiddleware, withdrawalsController.withdrawMoney)
            .get(withdrawalsController.withdrawHistory)
    }
}

export default WithrawalsRoute;
