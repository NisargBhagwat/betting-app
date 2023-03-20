import { body } from "express-validator";
import { colors } from "../../utils/globalConst";

export const newNumberBody = [
    body("number")
        .isInt({ min: 0, max: 9 })
        .withMessage("Invalid color!")
];