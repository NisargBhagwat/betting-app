import { Types, Document } from "mongoose";

export interface Transaction {
    _id?: Types.ObjectId;
    isCompleted: boolean;
    user: Types.ObjectId;
    razorpay_payment_id: string | null;
    razorpay_order_id: string | null;
    razorpay_signature: string | null;
    amount: number;
    fee: number;
}

export interface TransactionDoc extends Transaction, Document {
    _id: Types.ObjectId;
}

export interface TxnTokenResBody {
    txnToken: string,
    orderId: string;
    mId: string;
}

export interface VerificationBody {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}