import exp from "constants";
import { Document, Types } from "mongoose";

export interface Withdrawal {
    _id?: Types.ObjectId;
    payOutId: string;
    user: Types.ObjectId;
    amount: number;
    fee: number;
    createdAt: string;
    updatedAt: string;
}

export interface WithdrawalDoc extends Withdrawal, Document {
    _id: Types.ObjectId;
}