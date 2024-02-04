import { validate } from "./index.js";

export const createPostRequest = (req, res, next) => {
  return validate(req, res, next, {
    userId: "required",
    desc: "required",
    img: "required",
  });
};
