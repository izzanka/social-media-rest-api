import { login, register } from "../controllers/auth-controller.js";

export default (router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
