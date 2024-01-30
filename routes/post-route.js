import {
  createPost,
  deletePost,
  getPostById,
  getPostTimeline,
  likePost,
  updatePost,
} from "../controllers/post-controller.js";

export default (router) => {
  router.get("/posts/timelines", getPostTimeline);
  router.get("/posts/:id", getPostById);
  router.post("/posts", createPost);
  router.put("/posts/:id", updatePost);
  router.put("/posts/:id/likes", likePost);
  router.delete("/posts/:id", deletePost);
};
