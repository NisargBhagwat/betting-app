import { Router } from "express";

import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";
import Route from "../../common/interface/routes.interface";

import pricesController from "./prices.controller";
import { newPriceBodyDto } from "./prices.dto";

class PricesRoute implements Route {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .route('/')
            .all(authMiddleware(true))
            .get(pricesController.getAllPricesInfo)
            .post(newPriceBodyDto, validationMiddleware, pricesController.addNewPrice);
    }
}

export default PricesRoute;
