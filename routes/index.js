import { Router } from "express";
import userRoute from "./user-route.js";
import postRoute from "./post-route.js";
import authRoute from "./auth-route.js";

const router = Router();

export default () => {
  userRoute(router);
  postRoute(router);
  authRoute(router);
};
