const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      return res.status(200).json("account has been updated");
    } else {
      return res.status(403).json("you can update only your account");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("account has been deleted");
    } else {
      return res.status(403).json("you can delete only your account");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.put("/:id/follow", async (req, res) => {
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
});

router.put("/:id/unfollow", async (req, res) => {
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
});

module.exports = router;
