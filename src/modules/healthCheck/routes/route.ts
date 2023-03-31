import express from 'express';
import { getCheck } from '../controllers/healthCheck.controller';

const healthCheckRouter = express.Router();

healthCheckRouter.get('/', getCheck);

export default healthCheckRouter;
