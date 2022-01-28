import dotenv from 'dotenv';
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });
// console.log(envFile, process.env.JWT_SECRET);

export interface Config {
  port: number;
  debugLogging: boolean;
  dbsslconn: boolean;
  jwtSecret: string;
  cronJobExpression: string;
}

const isDevMode = process.env.NODE_ENV == 'development';

const config: Config = {
  port: +(process.env.PORT || 8000),
  debugLogging: isDevMode,
  dbsslconn: !isDevMode,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
  cronJobExpression: '0 * * * *'
};

export { config };
