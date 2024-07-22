import {Request, Response} from 'express';

class File{
    async uploadFile (_req: Request, res: Response): Promise<void> {
        try {
            res.status(201).json({
                message: 'File upload Successfuly',
                file: _req.file as Express.Multer.File
            })
        } catch (err) {
            res.status(401).json({err})
        } 
    }
}

export default new File();
