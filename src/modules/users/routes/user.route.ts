import express from 'express';
import { validation } from '../middlewares/validation';
import { signup } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/signup', validation, signup);

export default userRouter;
