import { Router } from "express";
import Route from "../../common/interface/routes.interface";

import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";

import paymentController from "./payment.controller";
import { orderIdDto, tokenBodyDto, paymentQueryDto, paymentVerifyBodyDto } from "./payment.dto";

class PaymentRoute implements Route {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/paytmCallback', orderIdDto, validationMiddleware, paymentController.paytmCallback);
        this.router.use(authMiddleware());
        this.router.post('/createTxnToken', tokenBodyDto, validationMiddleware, paymentController.createTxnToken);
        this.router.get("/", paymentController.getAllTransactions);
        this.router.get("/tnxCharge", paymentController.getTransactionCharge);
        this.router.get("/reqPayment", paymentQueryDto, validationMiddleware, paymentController.reqPayment);
        this.router.get("/key", paymentController.getPaymentKey);
        this.router.post("/verifyPayment", paymentVerifyBodyDto, validationMiddleware, paymentController.verifyPayment);
    }
}

export default PaymentRoute;   
