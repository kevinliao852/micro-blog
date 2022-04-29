import express from "express";
import { userRouter } from "./routes/api";
import { createConnection } from "typeorm";
import "reflect-metadata";
import bodyParser from "body-parser";
import { initDatabase } from "./database/databaseInit";

const server = async () => {
  const app = express();
  await createConnection();
  await initDatabase();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/user", userRouter);

  app.listen({ port: 3000, hostname: "0.0.0.0" }, () => {
    console.log("Server start at port 3000");
  });
};

server();
