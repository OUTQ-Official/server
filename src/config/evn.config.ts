import * as dotenv from 'dotenv';

export default () => ({
  port: parseInt(process.env.PORT),
  nodeEnv: process.env.NODE_ENV,
});

export const getEnvFilePath = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return '.env.prod';
    case 'development':
      return '.env.dev';
    default:
      return '.env.dev';
  }
};

export const loadEnv = () => {
  dotenv.config({ path: getEnvFilePath() });
};

loadEnv();
