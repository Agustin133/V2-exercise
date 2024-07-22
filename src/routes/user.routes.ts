import {Router} from 'express';
import userController from '../controllers/user.controller';
import passport from 'passport';

const authenticate = passport.authenticate('jwt', { session: false })
const router = Router();

router.get(
    '/',
    authenticate,
    userController.getUsers
);

router.get(
    '/:id',
    authenticate,
    userController.getUserById
)

router.post(
    '/:id',
    authenticate,
    userController.addCredits
)

router.post(
    '/transfer/:id/:id_2',
    authenticate,
    userController.transferCredits
)

export default router;
