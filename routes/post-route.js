import {
  createPost,
  deletePost,
  getPostById,
  getPostTimeline,
  likePost,
  updatePost,
} from "../controllers/post-controller.js";

export default (router) => {
  router.post("/posts/", createPost);
  router.put("/posts/:id", updatePost);
  router.delete("/posts/:id", deletePost);
  router.put("/posts/:id/likes", likePost);
  router.get("/posts/:id", getPostById);
  router.get("/posts/timelines", getPostTimeline);
};
