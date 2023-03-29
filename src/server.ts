import dotenv from 'dotenv';

import app from './app';
import { PORT } from './apiConfig';
import logger from './utils/logger';

dotenv.config();
const port: number = PORT;

app.listen(port, () => {
  logger.info(`App is running at http://localhost:${port}`);
  logger.info(`Press CTRL + C to stop\n`);
});
