import { User } from "../models/user-model.js";
import {hash, responseError, responseSuccess} from "../helpers/index.js";
import {response} from "express";

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        req.body.password = await hash(req.body.password, 10);
      }
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json(responseSuccess("account has been updated", null));
    } else {
      return res.status(403).json(responseError("you can update only your account"));
    }
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(responseSuccess("get user by id success", user));
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json(responseSuccess("account has been deleted", null));
    } else {
      return res.status(403).json(responseError("you can delete only your account"));
    }
  } catch (err) {
    next(err);
  }
};

export const followUser = async (req, res, next) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        return res.status(200).json(responseSuccess("user has been followed"));
      } else {
        return res.status(403).json(responseError("you already follow this user"));
      }
    }
  } catch (err) {
    next(err);
  }
};

export const unfollowUser = async (req, res, next) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        return res.status(200).json(responseSuccess("user has been unfollowed", null));
      } else {
        return res.status(403).json(responseError("you dont follow this user"));
      }
    }
  } catch (err) {
    next(err);
  }
};
