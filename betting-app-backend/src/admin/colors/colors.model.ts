import { number } from 'joi';
import { model, Schema } from 'mongoose';
import { colors, status } from '../../utils/globalConst';
import { Color, ColorDoc } from './colors.interface';


const colorSchema: Schema = new Schema<Color>(
    {
        color: { type: String, enum: colors, required: true, unique: true }
    }
);

const ColorModel = model<ColorDoc>('color', colorSchema);

export default ColorModel;
