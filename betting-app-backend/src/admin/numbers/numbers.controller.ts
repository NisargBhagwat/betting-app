import { Request, Response, NextFunction } from "express";

import { statusCode } from "../../utils/globalConst";
import { responseHandler } from "../../utils/utils";
import HttpException from "../../exceptions/HttpException";

import env from "../../configs/env.config";
import numbersService from "./numbers.service";
import { Number } from "./numbers.interface";

let instance: null | NumberController = null;

class NumberController {

    static getInstance(): NumberController {
        if (instance == null) {
            instance = new NumberController();
        }
        return instance;
    }

    public async allNumber(req: Request, res: Response, next: NextFunction) {
        try {
            const numbers: Number[] = await numbersService.getAllNumbers();

            return res
                .status(statusCode.OK)
                .json(responseHandler(numbers, statusCode.OK, "success"));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async addNewNumber(req: Request, res: Response, next: NextFunction) {
        try {
            const { number } = req.body;

            const newNumber = await numbersService.addNewNumber(number);

            return res
                .status(statusCode.OK)
                .json(responseHandler(newNumber, statusCode.OK, "success"));
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default NumberController.getInstance();