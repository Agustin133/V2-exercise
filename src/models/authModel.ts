import {model ,Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import helpers from '../utils/helpers'

export interface IAuth extends Document {
    password: string;
    email: string;
    role: string;
    comparePassword:(password: string) => Promise<Boolean>
}

const AuthDataSchema: Schema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin',
    }

}, {collection: 'Admin'})

AuthDataSchema.pre<IAuth>('save', async function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    } 

    user.password = await helpers.createHash(this.password);

    next();
})

AuthDataSchema.methods.comparePassword = async function (password: string): Promise<boolean>{
    return await bcrypt.compare(password, this.password);
}

export default model<IAuth>('Auth', AuthDataSchema);