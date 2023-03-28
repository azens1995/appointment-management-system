import dotenv from 'dotenv';
dotenv.config();

import { PORT } from './apiConfig';
import express, { Express } from 'express';
import { auth } from './modules/users/middlewares/auth';
import userRouter from './modules/users/routes/user.route';
import appointmentRouter from './modules/appointments/routes/appointment.route';

const app: Express = express();
const port: number = (PORT && parseInt(PORT)) || 8000;

app.use(express.json());

app.use('/users', userRouter);
app.use('/appointment', auth, appointmentRouter);

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
