import { Document, Types } from "mongoose";

export interface Price {
    _id?: Types.ObjectId;
    number: Types.ObjectId;
    color: Types.ObjectId;
    price: number;
}

export interface PriceDoc extends Document, Price {
    _id: Types.ObjectId;
}

export interface NewPriceBody {
    number: Types.ObjectId;
    color: Types.ObjectId;
    price: number;
}
