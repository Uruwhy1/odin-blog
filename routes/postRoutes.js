import express from "express";
import cors from "cors";
import {
  authenticateJWT,
  authorizePostUpdate,
  checkUserRole,
} from "../middleware/auth.js";
import * as postController from "../controllers/postController.js";

const router = express.Router();

const allowedOrigins = [process.env.ADMIN_FRONTEND, "http://localhost:3000"];

router.post(
  "/",
  authenticateJWT,
  checkUserRole,
  cors({ origin: allowedOrigins }),
  postController.createPost
);
router.get("/", cors({ allowedOrigins }), postController.fetchAllPosts);
router.get("/:id", cors({ allowedOrigins }), postController.fetchSinglePost);
router.put(
  "/:id",
  authenticateJWT,
  cors({ origin: allowedOrigins }),
  authorizePostUpdate,
  postController.updatePost
);
router.delete(
  "/:id",
  cors({ origin: allowedOrigins }),
  authenticateJWT,
  authorizePostUpdate,
  postController.deletePost
);

export default router;
