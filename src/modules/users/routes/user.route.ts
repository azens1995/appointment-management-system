import express from 'express';
import { auth } from '@common/middlewares/auth';
import { validation } from '@modules/users/middlewares/validation';
import {
  get,
  signup,
  signin
} from '@modules/users/controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', auth, get);
userRouter.post('/signup', validation, signup);
userRouter.post('/signin', validation, signin);

export default userRouter;
