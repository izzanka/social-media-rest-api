import { validate } from "./index.js";

export const updateUserRequest = (req, res, next) => {
  return validate(req, res, next, {
    userId: "required",
    desc: "required",
  });
};
