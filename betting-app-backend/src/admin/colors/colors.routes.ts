import { Router } from "express";

import validationMiddleware from "../../middlewares/validation.middleware";

import Route from "../../common/interface/routes.interface";

import colorsController from "./colors.controller";
import { newColorBody } from "./colors.dto";
import authMiddleware from "../../middlewares/auth.middleware";

class ColorsRoute implements Route {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .route('/')
            .get(colorsController.getAllColors)
            .all(authMiddleware(true))
            .post(newColorBody, validationMiddleware, colorsController.addNewColorType);
    }
}

export default ColorsRoute;
