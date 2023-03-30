import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { PORT } from '@config/appConfig';
import logger from '@utils/logger';

const port: number = PORT;

app.listen(port, () => {
  logger.info(`App is running at http://localhost:${port}`);
  logger.info(`Press CTRL + C to stop\n`);
});
