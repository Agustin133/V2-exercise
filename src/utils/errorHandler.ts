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
};

export default handleError;