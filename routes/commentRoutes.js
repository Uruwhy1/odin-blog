import express from "express";
import * as commentController from "../controllers/commentController.js";
import { authenticateJWT } from "../middleware/auth.js";

import cors from "cors";
const allowedOrigins = [process.env.ADMIN_FRONTEND, "http://localhost:3000"];

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  cors({ origin: allowedOrigins }),
  authenticateJWT,
  commentController.createComment
);
router.get("/", commentController.fetchCommentsByPost);
router.put("/:id", authenticateJWT, commentController.updateComment);

export default router;
