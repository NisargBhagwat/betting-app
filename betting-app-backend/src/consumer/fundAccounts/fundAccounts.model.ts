import { model, Schema } from 'mongoose';
import { accountTypes } from '../../utils/globalConst';

import { FundAccount, FundContactDoc } from './fundAccounts.interface';

const fundAccountSchema: Schema = new Schema<FundAccount>(
    {
        user: { type: Schema.Types.ObjectId, ref: "user", required: true },
        accountId: { type: String, required: true },
        active: { type: Boolean, default: true },
        accountType: { type: String, enum: accountTypes, require: true },
        accountRef: { type: String, required: true }
    }
);

const fundAccountModel = model<FundContactDoc>('fundAccount', fundAccountSchema);

export default fundAccountModel;
