import express, { Express } from 'express';
import 'express-async-errors';

import { auth } from '@common/middlewares/auth';
import userRouter from '@modules/users/routes/user.route';
import appointmentRouter from '@modules/appointments/routes/appointment.route';
import loggerMiddleware from '@common/middlewares/logger.middleware';
import healthCheckRouter from '@modules/healthCheck/routes/route';
import { errorMiddleware } from '@common/middlewares/error.midleware';

const app: Express = express();
app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/healthcheck', healthCheckRouter);
app.use('/api/v1/appointments', auth, appointmentRouter);
app.use(errorMiddleware);
export default app;
