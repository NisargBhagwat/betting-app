import { Types } from "mongoose";

import { statusCode } from "../../utils/globalConst";
import HttpException from "../../exceptions/HttpException";

import numberModel from "./numbers.model";
import { Number, NumberDoc } from "./numbers.interface";

let instance: null | NumbersService = null;

class NumbersService {
    private number = numberModel;

    static getInstance(): NumbersService {
        if (instance == null) {
            instance = new NumbersService();
        }

        return instance;
    }

    public async findNumber(number: number): Promise<Number> {
        return this.number.findOne({ number }).lean();
    }

    public async getIdByNumber(number: number): Promise<Types.ObjectId>{
        const numberInfo = await this.findNumber(number);
        return numberInfo._id!;
    }

    public async addNewNumber(number: number): Promise<NumberDoc> {
        if (await this.findNumber(number)) {
            throw new HttpException(statusCode.CONFLICT, "Number already exists!");
        }

        return await this.number.create({ number });
    }

    public async getAllNumbers(): Promise<Number[]> {
        return await this.number.find().select("number").lean();
    }
}

export default NumbersService.getInstance();