import mongoose, { Schema, Document } from 'mongoose';

interface ITransaction extends Document {
    senderId: string;
    receiverId: string;
    credits: number;
    date: Date;
}

const TransactionSchema: Schema = new Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { collection: 'Transactions' });

const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
export { ITransaction };
