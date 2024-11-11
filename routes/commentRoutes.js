import express from "express";
import * as commentController from "../controllers/commentController.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.post("/", authenticateJWT, commentController.createComment);
router.get("/", commentController.fetchCommentsByPost);

export default router;
