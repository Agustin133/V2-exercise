import UserDataSchema, { IUser } from "../models/csvModel";
import Transaction from "../models/transactionModel";

class User {

    private validateCredits(credits: any): void {
        if (typeof credits !== 'number') {
            throw new Error('Credits must be a number');
        }

        if (credits <= 0) {
            throw new Error(`Credits must be more than '0'`);
        }
    }

    private async getUser(id: string): Promise<IUser | null> {
        const user = await UserDataSchema.findOne({ id }).exec()

        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async getUsers(): Promise<IUser[]> {
        try {
            const users = await UserDataSchema.find().exec();

            if (!users) {
                throw new Error('There are users in the database');
            }
            return users;
        } catch (err) {
            throw err;
        }
    };

    async getUserById(id: string): Promise<IUser | null> {
        try {
            return this.getUser(id);
        } catch (err) {
            throw err;
        }
    };


    async addCredits(payload: { id: string; creditos: number }) {
        try {

            this.validateCredits(payload.creditos);

            const user = await UserDataSchema.findOne({ id: payload.id }).exec();

            if (!user) {
                throw new Error('User not found');
            }
            // add credit to the actual user credits
            user.creditos += payload.creditos;

            // save changes into the db
            const updatedUser = await user.save();

            return updatedUser;

        } catch (err) {
            throw err;
        }
    };

    async transferCredits(payload: { id: string, id_2: string, creditos: number }) {
        try {
            this.validateCredits(payload.creditos);
    
            const user_1 = await this.getUser(payload.id);
            const user_2 = await this.getUser(payload.id_2);

            if(payload.id === payload.id_2){
                throw new Error('You can not transfer to a user with the same id');
            }   

            if (!user_1) {
                throw new Error(`User with id ${payload.id} does not exist.`);
            }
    
            if (!user_2) {
                throw new Error(`User with id ${payload.id_2} does not exist.`);
            }
    
            if (user_1.creditos < payload.creditos) {
                throw new Error(`User with id ${payload.id} does not have enough credits. Available credits: ${user_1.creditos}`);
            }
    
            user_1.creditos -= payload.creditos;
            user_2.creditos += payload.creditos;
    
            await user_1.save();
            await user_2.save();
    
            // Record the transaction
            const transaction = new Transaction({
                senderId: payload.id,
                receiverId: payload.id_2,
                credits: payload.creditos,
            });
    
            await transaction.save();
    
            return { success: true, message: 'Credits transferred successfully.' };
        } catch (err) {
            throw err;
        };
    };

}

export default new User();
