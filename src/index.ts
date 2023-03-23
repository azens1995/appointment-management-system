import dotenv from 'dotenv';
dotenv.config();

import { PORT } from './apiConfig';
import express, { Express } from 'express';
import { client } from './modules/users/database';
import userRouter from './modules/users/routes/user.route';

const app: Express = express();
const port: number = (PORT && parseInt(PORT)) || 8000;

app.use(express.json());

app.use('/users', userRouter);

client.connect().then(() => {
  app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
  });
});
