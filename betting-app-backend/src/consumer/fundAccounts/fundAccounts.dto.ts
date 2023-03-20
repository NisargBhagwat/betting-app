import { body } from "express-validator";

export const bankAccountBodyDto = [
    body("name")
        .isString()
        .notEmpty().withMessage("Invalid name!")
        .trim(),

    body("ifsc")
        .isString()
        .notEmpty().withMessage("Invalid ifsc code!")
        .trim(),

    body("accountNumber")
        .isString()
        .notEmpty().withMessage("Invalid account number!")
        .trim()
]

export const upiAccountBodyDto = [
    body("address")
        .isString()
        .notEmpty().withMessage("Invalid address!")
        .trim()
]