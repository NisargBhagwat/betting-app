import { model, Schema } from 'mongoose';

import { Withdrawal, WithdrawalDoc } from './withdrawals.interface';

const withdrawalSchema: Schema = new Schema<Withdrawal>(
    {
        user: { type: Schema.Types.ObjectId, ref: "user", required: true },
        payOutId: { type: String, required: true },
        amount: { type: Number, required: true },
        fee: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

const withdrawalModel = model<WithdrawalDoc>('withdrawal', withdrawalSchema);

export default withdrawalModel;
