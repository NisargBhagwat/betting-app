import { Document, Types } from "mongoose";

export interface Number {
    _id?: Types.ObjectId;
    number: number
}

export interface NumberDoc extends Document, Number {
    _id: Types.ObjectId;
}