import { Types } from "mongoose";

import { status, statusCode } from "../../utils/globalConst";
import HttpException from "../../exceptions/HttpException";

import gameTypeModel from "./gameTypes.model";
import { GameType, GameTypeDoc } from "./gameTypes.interface";

let instance: null | GameTypesService = null;

class GameTypesService {
    private gameType = gameTypeModel

    static getInstance(): GameTypesService {
        if (instance == null) {
            instance = new GameTypesService();
        }

        return instance;
    }

    public async addNewGameType(newGame: string): Promise<GameTypeDoc> {
        if (await this.isGameExists(newGame)) {
            throw new HttpException(statusCode.CONFLICT, "Game already exists!");
        }

        return await this.gameType.create({
            gameName: newGame
        });
    }

    public async isGameExists(game: string): Promise<GameType | null> {
        return await this.gameType.findOne({
            gameName: {
                '$regex': `^${game}$`,
                '$options': 'i'
            },
            isDeleted: false
        }).lean();
    }

    public async getAllActiveGames(): Promise<any> {
        return await this.gameType.find(
            {
                isDeleted: false,
                status: status.active
            },
            {
                gameName: 1
            }
        ).lean();
    }

    public async getGameById(gameTypeId: Types.ObjectId): Promise<GameType | null> {
        return await this.gameType.findOne({ _id: gameTypeId, isDeleted: true }).lean()
    }

    public async getGameTypeDocById(gameTypeId: Types.ObjectId): Promise<GameTypeDoc | null> {
        return await this.gameType.findOne({ _id: gameTypeId, isDeleted: false });
    }

    public async deleteGame(gameTypeId: Types.ObjectId): Promise<GameType | null> {
        return await this.gameType.findOneAndUpdate(
            {
                _id: gameTypeId
            },
            {
                isDeleted: true
            },
            {
                new: true
            }
        ).lean()
    };

    public async updateGameName(gameTypeId: Types.ObjectId, gameName: string | undefined): Promise<GameType | null> {
        if (gameName && await this.isGameExists(gameName)) {
            throw new HttpException(statusCode.CONFLICT, "Game already exists!");
        }

        return await this.gameType.findOneAndUpdate(
            {
                _id: gameTypeId
            },
            {
                ...(gameName && { gameName })
            },
            {
                new: true
            }
        )
            .select("gameName")
            .lean();
    }

    public async updateStatus(gameTypeId: Types.ObjectId): Promise<GameType> {
        const gameTypeInfo: GameTypeDoc | null = await this.getGameTypeDocById(gameTypeId);

        if (!gameTypeInfo) {
            throw new HttpException(statusCode.NOT_FOUND, "Game Type not exists!");
        }

        return await this.gameType.findOneAndUpdate(
            {
                _id: gameTypeId
            },
            {
                status: gameTypeInfo.status === status.active ? status.inactive : status.active
            }
        )
            .select("gameName")
            .lean();
    }
}

export default GameTypesService.getInstance();