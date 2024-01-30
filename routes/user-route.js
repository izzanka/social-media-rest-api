import {
  followUser,
  getUserById,
  unfollowUser,
  updateUser,
} from "../controllers/user-controller.js";

export default (router) => {
  router.put("/users/:id", updateUser);
  router.get("/users/:id", getUserById);
  router.put("/users/:id/follows", followUser);
  router.put("/users/:id/unfollows", unfollowUser);
};
