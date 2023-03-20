import { Request, Response, NextFunction } from "express";

import { colors, statusCode } from "../../utils/globalConst";
import { responseHandler } from "../../utils/utils";
import HttpException from "../../exceptions/HttpException";
import env from "../../configs/env.config";

import colorsService from "./colors.service";
import { Color, ColorDoc } from "./colors.interface";

let instance: null | ColorsController = null;

class ColorsController {

    static getInstance(): ColorsController {
        if (instance == null) {
            instance = new ColorsController();
        }
        return instance;
    }

    public async addNewColorType(req: Request, res: Response, next: NextFunction) {
        try {
            const { color } = req.body;

            const newColorDetails: ColorDoc = await colorsService.addNewColor(color);

            return res
                .status(statusCode.OK)
                .json(responseHandler(newColorDetails, statusCode.OK, "success"));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async getAllColors(req: Request, res: Response, next: NextFunction) {
        try {
            const colors: Color[] = await colorsService.allColors();

            return res
                .status(statusCode.OK)
                .json(responseHandler(colors, statusCode.OK, "success"));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default ColorsController.getInstance();