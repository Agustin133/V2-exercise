import {model ,Document, Schema } from 'mongoose';

export interface IUser extends Document {
    
    nombre: string;
    email: string;
    creditos: number;
    id: string;
}

const UserDataSchema: Schema = new Schema({
 
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    id: {
        type: String,
        required: true,
    },
    creditos: {
        type: Number,
        required: true,
        default: 0,  // Default value for creditos
    },
}, {collection: 'Users'});

export default model<IUser>('User', UserDataSchema);
