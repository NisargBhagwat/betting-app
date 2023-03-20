import { Types } from "mongoose";

import { statusCode } from "../../utils/globalConst";
import HttpException from "../../exceptions/HttpException";

import priceModel from "./prices.model";
import { NewPriceBody, Price } from "./prices.interface";

let instance: null | PricesService = null;

class PricesService {
    private price = priceModel;

    static getInstance(): PricesService {
        if (instance == null) {
            instance = new PricesService();
        }

        return instance;
    }

    public async getAllPricesInfo(): Promise<Price[]> {
        return await this.price.find().select("number color price").lean();
    }

    public async addNewPrice(priceInfo: NewPriceBody): Promise<any> {
        return await this.price.create({
            ...priceInfo
        });
    }
}

export default PricesService.getInstance();