import { number } from 'joi';
import { model, Schema } from 'mongoose';
import { status } from '../../utils/globalConst';

import { GameType, GameTypeDoc } from './gameTypes.interface';

const gameTypeSchema: Schema = new Schema<GameType>(
    {
        gameName: { type: String, required: true },
        status: { type: String, enum: status, default: status.active },
        isDeleted: { type: Boolean, default: false }
    }
);

const GameTypeModel = model<GameTypeDoc>('gameType', gameTypeSchema);

export default GameTypeModel;
