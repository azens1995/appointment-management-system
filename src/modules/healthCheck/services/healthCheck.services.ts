import { SystemHealth } from '@modules/healthCheck/dto/systemhealth.dto';

export const getHealthCheck = async () => {
  const healthcheck = {
    uptime: process.uptime(),
    responsetime: process.hrtime(),
    message: 'System is up.',
    timestamp: Date.now()
  } as SystemHealth;

  return healthcheck;
};
