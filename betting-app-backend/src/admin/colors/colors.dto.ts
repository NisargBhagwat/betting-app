import { body } from "express-validator";
import { colors } from "../../utils/globalConst";

export const newColorBody = [
    body("color")
        .isIn([
            colors.green,
            colors.red,
            colors.violet
        ]).withMessage("Invalid color!")
];