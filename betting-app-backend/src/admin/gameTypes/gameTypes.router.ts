import { Router } from "express";

import validationMiddleware from "../../middlewares/validation.middleware";
import Route from "../../common/interface/routes.interface";
import authMiddleware from "../../middlewares/auth.middleware";

import gameTypesController from "./gameTypes.controller";
import { gameTypeIdDto, gameTypeUpdateBodyDto, newGameTypeBodyDto } from "./gameTypes.dto";

class GameTypesRoute implements Route {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
            .get('/', gameTypesController.getAllGameTypes)
            .route('/')
            .all(authMiddleware(true))
            .post(newGameTypeBodyDto, validationMiddleware, gameTypesController.addNewGameType);

        this.router
            .patch('/status/:gameTypeId', gameTypeIdDto, validationMiddleware, gameTypesController.statusUpdate)
            .route('/:gameTypeId')
            .all(authMiddleware(true))
            .delete(gameTypeIdDto, validationMiddleware, gameTypesController.deleteGameType)
            .patch(gameTypeUpdateBodyDto, validationMiddleware, gameTypesController.updateGameTypeInfo);
    }
}

export default GameTypesRoute;
