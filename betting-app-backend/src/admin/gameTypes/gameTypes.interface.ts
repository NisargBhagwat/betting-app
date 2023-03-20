import { Document, Types } from "mongoose";
import { status } from "../../utils/globalConst";

export interface GameType {
    _id?: Types.ObjectId;
    gameName: string;
    status: status;
    isDeleted: boolean;
}

export interface GameTypeDoc extends GameType, Document {
    _id: Types.ObjectId;
}