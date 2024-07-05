import dotenv from 'dotenv';
import path from 'path';
import { Algorithm } from 'jsonwebtoken';
// import LOGGER from '../../../config/winstonLogger';

let newPath;
// LOGGER.info(__dirname);   //! index.ts, index.js 있는 디렉토리
// LOGGER.info(path.join(__dirname, '../../../.env'));
dotenv.config({ path: path.join(__dirname, '../../../.env') });

switch (process.env.NODE_ENV) {
  case 'production':
    newPath = path.join(__dirname, '../../../.env.prod');
    // LOGGER.info('production');
    break;
  // case "test":
  //   newPath = path.join(__dirname, '../../../.env.test');
  //   LOGGER.info('test');
  //   break;
  case 'development':
    // LOGGER.info('dev');
    newPath = path.join(__dirname, '../../../.env.dev');
    break;
  default:
    // LOGGER.info('else');
    newPath = path.join(__dirname, '../../../.env.dev');
}

//~ 환경변수 초기화
delete process.env.VARIABLE;
// LOGGER.info(process.env);
const envFound = dotenv.config({ path: newPath, override: true });
// LOGGER.info(process.env);
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT as string, 10) as number,
  env: process.env.NODE_ENV as string,

  //데이터베이스

  //? 데이터베이스
  database: process.env.DATABASE_URL as string,
  redisHost: process.env.REDIS_HOST as string,
  redisPort: process.env.REDIS_PORT as unknown as number,
  redisPassword: process.env.REDIS_PASSWORD as string,
  elastiCacheRedisPort: process.env.ELASTIC_CACHE_REDIS_PORT as string,
  elastiCacheRedisHost: process.env.ELASTIC_CACHE_REDIS_HOST as string,

  //? JWT
  jwtSecret: process.env.JWT_SECRET as string,
  jwtAlgo: process.env.JWT_ALGO as Algorithm,
  jwtAccessExp: process.env.JWT_ACCESS_TOKEN_EXPIRE as string,
  jwtRefreshExp: process.env.JWT_REFRESH_TOKEN_EXPIRE as string,

  //? AWS CloudFront
  cloudfrontPrivateKey: process.env.CLOUDFRONT_PRIVATE_KEY as unknown as string,
  cloudfrontKeyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID as string,

  tracksCloudFrontDomain: process.env.CLOUDFRONT_BUCKET_TRACKS as string,
  profileImageCloudFrontDomain: process.env.CLOUDFRONT_BUCKET_PROFILE as string,
  commentsCloudFrontDomain: process.env.CLOUDFRONT_BUCKET_COMMENT as string,
  producerPortfolioCloudFrontDomain: process.env.CLOUDFRONT_BUCKET_PRODUCER_PORTFOLIO as string,
  vocalPortfolioCloudFrontDomain: process.env.CLOUDFRONT_BUCKET_VOCAL_PORTFOLIO as string,

  //? AWS S3
  s3AccessKey: process.env.S3_ACCESS_KEY as string,
  s3SecretKey: process.env.S3_SECRET_KEY as string,

  tracksBucketName: process.env.S3_BUCKET_TRACKS as string, //* Image + Audio
  profileImageBucketName: process.env.S3_BUCKET_PROFILE as string, //* Image
  commentsBucketName: process.env.S3_BUCKET_COMMENT as string, //* Audio
  producerPortfolioBucketName: process.env.S3_BUCKET_PRODUCER_PORTFOLIO as string, //* Image + Audio
  vocalPortfolioBucketName: process.env.S3_BUCKET_VOCAL_PORTFOLIO as string, //* Image + Audio

  defaultUserProfileImage: process.env.S3_DEFAULT_USER_IMAGE as string, //* default user image file
  defaultVocalPortfolioImage: process.env.S3_DEFAULT_VOCAL_PORTFOLIO_IMAGE as string, //* default vocal portfolio image
  defaultJacketAndProducerPortfolioImage: process.env.S3_DEFUALT_JACKET_PRODUCER_PORTFOLIO_IMAGE as string, //* default beat jacket + producer potfolio image
  defaultEventImage: process.env.S3_DEFAULT_EVENT_IMAGE as string, //* default event image
  track1EmailImage: process.env.S3_TRACK1_EMAIL_IMAGE as string, //* user-join & reset-password email

  //? Log API
  logAPI: process.env.LOG_API as string,

  //? Slack Webhook
  slackErrorAlarm: process.env.ERROR_SLACK_ALARM_URI as string,
  slackCommentAlarm: process.env.COMMENT_SLACK_ALARM_URI as string,

  //? SMTP mail
  mailUser: process.env.EMAIL_USER as string,
  mailPassword: process.env.EMAIL_PASSWORD as string,
};
