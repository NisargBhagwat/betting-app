import { Document, Types } from "mongoose";

export interface FundAccount {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    accountId: string;
    active: boolean;
    accountType: string;
    accountRef: string;
}

export interface FundContactDoc extends Document, FundAccount {
    _id: Types.ObjectId;
}

export interface BankAccountBody {
    name: string;
    ifsc: string;
    accountNumber: string;
}

export interface UPIAccountBody {
    address: string;
}

