export const PORT = process.env.PORT;
export const DB_NAME = process.env.DB_NAME;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const ACCESS_TOKEN_SECRET_KEY =
  process.env.ACCESS_TOKEN_SECRET_KEY || '';
export const REFRESH_TOKEN_SECRET_KEY =
  process.env.REFRESH_TOKEN_SECRET_KEY || '';
export const DB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster1.txtza5c.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
