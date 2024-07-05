import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './domain/rouetr';

dotenv.config();

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production' ? '.env' : '.env.dev' //실제는 .env, 개발은 .env.dev사용
  ),
});

const app = express();
const corsOriginList = ['http://localhost:3000', 'http://localhost:8080'];
const corsOptions = {
  origin: corsOriginList,
  credentials: true,
  optionsSuccessStatus: 200,
};

// app.use(session({}));

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    ...corsOptions,
  })
);

//절대경로 설정
app.use('/public', express.static(path.join(__dirname, '../public')));

//데이터 베이스 연결
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Mongodb connected');
    })
    .catch((error) => {
      console.log(error);
    });
}

app.use('/', router);

export default app;
