import { Request, Response, NextFunction } from "express";

import { statusCode } from "../../utils/globalConst";
import { responseHandler } from "../../utils/utils";
import HttpException from "../../exceptions/HttpException";
import env from "../../configs/env.config";

import pricesService from "./prices.service";
import { NewPriceBody, PriceDoc } from "./prices.interface";

let instance: null | NumberController = null;

class NumberController {

    static getInstance(): NumberController {
        if (instance == null) {
            instance = new NumberController();
        }
        return instance;
    }

    public async getAllPricesInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const pricesInfo = await pricesService.getAllPricesInfo();

            return res
                .status(statusCode.OK)
                .json(responseHandler(pricesInfo, statusCode.OK, "success"));
        }
        catch (error) {
            console.log(error);
        }
    }

    public async addNewPrice(req: Request, res: Response, next: NextFunction) {
        try {
            const newPriceBody: NewPriceBody = req.body;

            const newPriceInfo: PriceDoc = await pricesService.addNewPrice(newPriceBody);

            return res
                .status(statusCode.OK)
                .json(responseHandler(newPriceInfo, statusCode.OK, "success"));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default NumberController.getInstance();