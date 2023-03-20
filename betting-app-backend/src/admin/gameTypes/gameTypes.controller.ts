import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

import { statusCode } from "../../utils/globalConst";
import { responseHandler } from "../../utils/utils";
import HttpException from "../../exceptions/HttpException";
import env from "../../configs/env.config";

import { GameType, GameTypeDoc } from "./gameTypes.interface";
import gameTypesService from "./gameTypes.service";

let instance: null | GameTypesController = null;

class GameTypesController {

    static getInstance(): GameTypesController {
        if (instance == null) {
            instance = new GameTypesController();
        }
        return instance;
    }

    public async addNewGameType(req: Request, res: Response, next: NextFunction) {
        try {
            const { game } = req.body;

            const newGame: GameTypeDoc = await gameTypesService.addNewGameType(game);

            return res
                .status(statusCode.OK)
                .json(responseHandler(newGame, statusCode.OK, "success"));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async getAllGameTypes(req: Request, res: Response, next: NextFunction) {
        try {
            const allGames: GameType[] = await gameTypesService.getAllActiveGames();

            return res
                .status(statusCode.OK)
                .json(responseHandler(allGames, statusCode.OK, "success"));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async deleteGameType(req: Request, res: Response, next: NextFunction) {
        try {
            const { gameTypeId } = req.params as unknown as any;

            await gameTypesService.deleteGame(gameTypeId);

            return res
                .status(statusCode.OK)
                .json(responseHandler(null, statusCode.OK, "success"));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async updateGameTypeInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const { game } = req.body;
            const { gameTypeId } = req.params as unknown as any;

            const gameTypeInfo: GameType | null = await gameTypesService.updateGameName(gameTypeId, game);

            return res
                .status(statusCode.OK)
                .json(responseHandler(gameTypeInfo, statusCode.OK, "success"));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async statusUpdate(req: Request, res: Response, next: NextFunction) {
        try {
            const { gameTypeId } = req.params as unknown as any;

            const gameTypeInfo: GameType = await gameTypesService.updateStatus(gameTypeId);

            return res
                .status(statusCode.OK)
                .json(responseHandler(gameTypeInfo, statusCode.OK, "success"));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default GameTypesController.getInstance();