import { User } from "../models/user-model.js";
import { hash } from "../helpers/index.js";

export const updateUser = async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        req.body.password = await hash(req.body.password, 10);
      }
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      return res.status(200).json("account has been updated");
    } else {
      return res.status(403).json("you can update only your account");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "+updatedAt +password",
    );
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const followUser = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        return res.status(200).json("user has been followed");
      } else {
        return res.status(403).json("you already follow this user");
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const unfollowUser = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        return res.status(200).json("user has been unfollowed");
      } else {
        return res.status(403).json("you dont follow this user");
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
