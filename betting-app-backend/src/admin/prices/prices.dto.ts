import { body } from "express-validator";

export const newPriceBodyDto = [
    body("number")
        .isMongoId().withMessage("Invalid number!"),

    body("color")
        .isMongoId().withMessage("Invalid color!"),

    body("price")
        .isNumeric().withMessage("Invalid price!")
] 