import {Request, Response} from 'express';
import authServices from '../services/auth.services';

export const signUp = async (_req: Request, res: Response) => {
    try {
        if(!_req.body.email || !_req.body.password){
            return res.status(400).json({message: 'Please send your email and password'});
        }

        const user = await authServices.signUp(_req.body);      
        res.status(201).json(user);

    } catch (err) {
        if (err instanceof Error) {
            if (err.message === 'User already exists') {
                res.status(409).json({ error: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        } else {
            console.error('Unknown error occurred:', err);
        }
    }
}

export const signIn = async (_req: Request, res: Response) => {
    try {
        if(!_req.body.email || !_req.body.password){
            return res.status(400).json({message: 'Please send your email and password'});
        }

        const token = await authServices.signIn(_req.body);        

        if(token){
            res.status(200).json({token});
        }

    } catch (err) {
        if (err instanceof Error) {
            if (err.message === 'Unauthorized') {
                res.status(401).json({ error: err.message }); // 401 Unauthorized
            } else {
                res.status(500).json({ error: err.message });
            }
        } else {
            console.error('Unknown error occurred:', err);
        }
    }
}
