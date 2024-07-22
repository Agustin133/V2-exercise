import Auth, { IAuth } from '../models/authModel';
import helpers from '../utils/helpers';

class AuthService {

    async signUp(payload: IAuth){
        try { 
            const user = await Auth.findOne({email: payload.email});

            if (user) {
                throw new Error ('User already exists'); 
            }

            const newUser = new Auth(payload);
            await newUser.save();

            return newUser;

        } catch (err) {
            throw err;
        };
    };


    async signIn(payload: IAuth){
        try {
            
            const user = await Auth.findOne({email: payload.email});

            if(!user){
                throw new Error('Unauthorized');
            }

            const isMatch = await user.comparePassword(payload.password);

            if(isMatch){
                return helpers.createToken(user);
            } else {
                throw new Error('Unauthorized');
            }
            
        } catch (err) {
            throw err;
        };
    };
}

export default new AuthService();
