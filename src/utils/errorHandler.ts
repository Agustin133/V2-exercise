import { Response } from 'express';


const handleError = (err: unknown, res: Response): void => {
    console.error(err);
    if (err instanceof Error) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    } else {
        console.error('Unknown error occurred:', err);
        res.status(500).json({ error: 'Unknown error occurred' });
    }
    // if (err instanceof Error) {F
    //     if (err.message === 'User not found') {
    //         res.status(404).json({ error: err.message });
    //     } else if (err.message === 'There are users in the database') {
    //         res.status(404).json({ error: err.message });
    //     } else if (err.message === `Credits must be more than '0'` || err.message === 'Credits must be a number') {
    //         res.status(400).json({ error: err.message });
    //     } else if('User does not have enough credits.') {
    //         res.status(404).json({ error: err.message });
    //     }  else if('User does not exist..') {
    //         res.status(404).json({ error: err.message });
    //     }  else {
    //         res.status(500).json({ error: err.message });
    //     } 
    // } else {
    //     console.error('Unknown error occurred:', err);
    //     res.status(500).json({ error: 'Unknown error occurred' });
    // }
};

export default handleError;