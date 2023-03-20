import { Types } from "mongoose";

export interface Color {
    _id?: Types.ObjectId;
    color: string;
}

export interface ColorDoc {
    _id: Types.ObjectId;
}

