import express from 'express';
import { userRouter } from './routes/api';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import bodyParser from 'body-parser';

const server = async () => {
  const app = express();
  await createConnection();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/user', userRouter);

  app.listen({ port: 3000, hostname: '0.0.0.0' }, () => {
    console.log('server started');
  });
};

server();
