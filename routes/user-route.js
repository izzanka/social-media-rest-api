import {
  deleteUser,
  followUser,
  getUserById,
  unfollowUser,
  updateUser,
} from "../controllers/user-controller.js";
import { updateUserRequest } from "../requests/user-request.js";

export default (router) => {
  router.get("/users/:id", getUserById);
  router.put("/users/:id", updateUserRequest, updateUser);
  router.put("/users/:id/follows", followUser);
  router.put("/users/:id/unfollows", unfollowUser);
  router.delete("/users/:id", deleteUser);
};
