import logger from '@utils/logger';

process.on('unhandledRejection', (reason: Error | any) => {
  logger.warn(`Unhandled Rejection: ${reason.message || reason}`);

  throw new Error(reason.message || reason);
});
