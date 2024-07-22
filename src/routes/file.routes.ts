import {Router} from 'express';
import file from '../controllers/file.controllers';
import { handleFileUpload } from '../middlewares/file.middleware';
import passport from 'passport';

const router = Router();

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    handleFileUpload,
    file.uploadFile
);

export default router
