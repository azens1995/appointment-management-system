import express from 'express';
import { validation } from '../middlewares/validation';
import { signup, signin } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/signup', validation, signup);
userRouter.post('/signin', validation, signin);

export default userRouter;
