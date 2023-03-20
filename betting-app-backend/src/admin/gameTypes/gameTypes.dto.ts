import { body, param } from "express-validator";

export const newGameTypeBodyDto = [
    body("game")
        .isString()
        .notEmpty().withMessage("Invalid game name!")
]

export const gameTypeIdDto = [
    param("gameTypeId")
        .isMongoId().withMessage("Invalid game typeId!")
]

export const gameTypeUpdateBodyDto = [
    ...gameTypeIdDto,

    body("game")
        .optional()
        .isString()
        .notEmpty().withMessage("Invalid game name!")
]