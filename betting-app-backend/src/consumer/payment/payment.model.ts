import { model, Schema } from 'mongoose';
import { Transaction, TransactionDoc } from './payment.interface';

const transactionSchema: Schema = new Schema<Transaction>(
    {
        user: { type: Schema.Types.ObjectId, ref: "user", required: true },
        isCompleted: { type: Boolean, default: false },
        razorpay_payment_id: { type: String, default: null },
        razorpay_order_id: { type: String, required: true },
        razorpay_signature: { type: String, default: null },
        amount: { type: Number, required: true },
        fee: { type: Number, required: true }
    },
    {
        timestamps: true
    }
)

const transactionModel = model<TransactionDoc>('transaction', transactionSchema);

export default transactionModel;
