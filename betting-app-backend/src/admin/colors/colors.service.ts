import { Types } from "mongoose";

import { colors, statusCode } from "../../utils/globalConst";
import HttpException from "../../exceptions/HttpException";

import colorModel from "./colors.model";
import { Color, ColorDoc } from "./colors.interface";

let instance: null | ColorsService = null;

class ColorsService {
    private color = colorModel;

    static getInstance(): ColorsService {
        if (instance == null) {
            instance = new ColorsService();
        }

        return instance;
    }

    public async addNewColor(color: colors): Promise<ColorDoc> {
        if (await this.findColor(color)) {
            throw new HttpException(statusCode.CONFLICT, "Color already exists!");
        }

        return await this.color.create({ color });
    }

    public async findColor(color: colors): Promise<Color> {
        return await this.color.findOne({
            color
        }).lean();
    }

    public async getIdByColor(color: colors): Promise<Types.ObjectId> {
        const colorDetails: Color = await this.findColor(color);
        return colorDetails._id!;
    }

    public async allColors(): Promise<Color[]> {
        return await this.color.find().select("color").lean();
    }
}

export default ColorsService.getInstance();