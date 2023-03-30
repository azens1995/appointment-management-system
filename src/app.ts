import express, { Express } from 'express';

import { auth } from './modules/users/middlewares/auth';
import userRouter from './modules/users/routes/user.route';
import appointmentRouter from './modules/appointments/routes/appointment.route';
import loggerMiddleware from './common/middlewares/logger.middleware';

const app: Express = express();
app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/appointments', auth, appointmentRouter);

export default app;
