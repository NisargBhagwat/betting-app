import { Router } from "express";

import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";
import Route from "../../common/interface/routes.interface";

import numbersController from "./numbers.controller";
import { newNumberBody } from "./numbers.dto";

class NumbersRoute implements Route {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .route('/')
            .get(numbersController.allNumber)
            .all(authMiddleware(true))
            .post(newNumberBody, validationMiddleware, numbersController.addNewNumber);
    }
}

export default NumbersRoute;
