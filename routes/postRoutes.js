import express from "express";
import { authenticateJWT, authorizePostUpdate } from "../middleware/auth.js";
import * as postController from "../controllers/postController.js";

const router = express.Router();

router.post("/", authenticateJWT, postController.createPost);
router.get("/", postController.fetchAllPosts);
router.get("/:id", postController.fetchSinglePost);
router.put(
  "/:id",
  authenticateJWT,
  authorizePostUpdate,
  postController.updatePost
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizePostUpdate,
  postController.deletePost
);

export default router;
