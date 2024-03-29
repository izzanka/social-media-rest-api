import { User } from "../models/user-model.js";
import {hash, responseError, responseSuccess} from "../helpers/index.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    return res.status(200).json(responseSuccess("register success", user));
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json(responseError("email not found"));
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!validPassword) return res.status(400).json(responseError("wrong password"));
    return res.status(200).json(responseSuccess("login success", user));
  } catch (err) {
    next(err);
  }
};
