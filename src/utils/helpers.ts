import bcrypt from 'bcrypt';
import { IAuth } from '../models/authModel';
import jwt from 'jsonwebtoken'
import config from '../config/config';

class Helpers{
    async createHash(payload: string){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(payload, salt);
        return hash
    }

    async createToken(user: IAuth){
        const token = jwt.sign({id: user.id, email: user.email, role: user.role}, config.jwtSecret, {
            expiresIn: 86400 // equal 1 day
        });
        return token
    }

}

export default  new Helpers()