import express from 'express';
import { auth } from '../middlewares/auth';
import { validation } from '../middlewares/validation';
import { get, signup, signin } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', auth, get);
userRouter.post('/signup', validation, signup);
userRouter.post('/signin', auth, validation, signin);

export default userRouter;
