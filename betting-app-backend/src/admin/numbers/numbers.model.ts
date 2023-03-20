import { number } from 'joi';
import { model, Schema } from 'mongoose';

import { colors, status } from '../../utils/globalConst';
import { NumberDoc, Number } from './numbers.interface';

const numberSchema: Schema = new Schema<Number>(
    {
        number: { type: Number, required: true, unique: true }
    }
);

const NumberModel = model<NumberDoc>('number', numberSchema);

export default NumberModel;
