import { body } from "express-validator";

export const withdrawBodyDto = [
    body("accountId")
        .isMongoId().withMessage("Invalid accountId!"),

    body("amount")
        .isNumeric().withMessage("Invalid amount!")
        .toInt()
]
