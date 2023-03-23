import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import express, { Express } from 'express';
import { DB_URI, PORT } from './apiConfig';
import userRouter from './modules/users/routes/user.route';

const app: Express = express();
const port: number = (PORT && parseInt(PORT)) || 8000;

app.use(express.json());

app.use('/users', userRouter);

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected successfully on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
