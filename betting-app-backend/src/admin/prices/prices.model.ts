import { number } from 'joi';
import { model, Schema } from 'mongoose';

import { colors, status } from '../../utils/globalConst';
import { Price, PriceDoc } from './prices.interface';

const priceSchema: Schema = new Schema<Price>(
    {
        number: { type: Schema.Types.ObjectId, required: true, ref: "number" },
        color: { type: Schema.Types.ObjectId, required: true, ref: "color" },
        price: { type: Number, required: true }
    }
);

priceSchema.index(
    {
        number: 1,
        color: 1
    },
    {
        unique: true
    }
);
const PriceModel = model<PriceDoc>('price', priceSchema);

export default PriceModel;
