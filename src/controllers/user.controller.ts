import { Request, Response } from 'express';
import userService from '../services/user.services';
import handleError from '../utils/errorHandler';

class UserController {

    async getUsers(_req: Request, res: Response): Promise<void> {
        try {
            const users = await userService.getUsers();
            res.status(200).json(users);
        } catch (err) {
            handleError(err, res);
        }
    }

    async getUserById(_req: Request, res: Response): Promise<void>{
        try {  
            const userId = _req.params.id;
            const user = await userService.getUserById(userId);
            res.status(200).json(user);
        } catch (err) {
            handleError(err, res);
        }
    }

    async addCredits(_req: Request, res: Response){
        try {

            const payload = {
                id: _req.params.id,
                creditos: _req.body.creditos
            }
            
            await userService.addCredits(payload);
            
            res.status(200).json({
                message: 'Credits added successfully!'
            });
            

        } catch (err) {
            handleError(err, res);
        }
    }

    async transferCredits(_req: Request, res: Response) {
        try {
            const payload = {
                id: _req.params.id,
                id_2: _req.params.id_2,
                creditos: _req.body.creditos,
            };
    
            await userService.transferCredits(payload);

            res.status(200).json({
                message: 'Credits transferred successfully!',
            });
        } catch (err) {

            if (err instanceof Error) {
                handleError(err, res);
            } else {
                console.error('Unknown error:', err);
                res.status(500).json({
                    success: false,
                    message: 'An unknown error occurred',
                });
            }
        }
    }
}

export default new UserController();
