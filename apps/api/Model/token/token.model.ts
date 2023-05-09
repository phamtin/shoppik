import mongoose from 'mongoose';
import { Token } from './token.entity';

const tokenSchema = new mongoose.Schema<Token>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
    },
    { timestamps: true, toObject: { virtuals: true } },
);

const Token = mongoose.model('Token', tokenSchema);

export default Token;
