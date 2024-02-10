import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import router from "./routes/index.js";
import { errorMiddleware, notFoundMiddleware } from "./middlewares/index.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" },
);

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("error connecting to mongodb: ", error);
  });

app.use(express.json());
app.use(helmet());
app.use(morgan("short", { stream: accessLogStream }));
app.use(compression());
app.use(cors());

app.listen(8800, () => {
  console.log("backend server is running");
});

app.use("/api/v1", router());
app.use(notFoundMiddleware);
app.use(errorMiddleware);
