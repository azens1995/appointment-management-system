import { HttpError, HttpSuccess } from '../../../utils/message';

export const getHealthCheck = async () => {
  try {
    const healthcheck = {
      uptime: process.uptime(),
      responsetime: process.hrtime(),
      message: 'OK',
      timestamp: Date.now()
    };

    return HttpSuccess.OK(healthcheck);
  } catch (error) {
    return HttpError.BadRequest('Something went wrong.');
  }
};
