import {Router} from 'express';
import passport from 'passport';
import report from '../controllers/report.controller';

const router = Router();

router.get(
    '/',
    passport.authenticate('jwt', { session: false }), 
    report.generateReport
);

export default router;
