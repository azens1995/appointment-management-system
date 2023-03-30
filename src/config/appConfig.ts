import dotenv from 'dotenv';
dotenv.config();

export const PORT = Number(process.env.PORT ?? 3000);
export const ACCESS_TOKEN_SECRET_KEY =
  process.env.ACCESS_TOKEN_SECRET_KEY || '';
export const REFRESH_TOKEN_SECRET_KEY =
  process.env.REFRESH_TOKEN_SECRET_KEY || '';
export const ENVIRONMENT = process.env.APP_ENV || 'development';
