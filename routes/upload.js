import express from "express";
import cloudinary from "../cloudinaryConfig.js";
import cors from "cors";
import multer from "multer";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const allowedOrigins = [process.env.ADMIN_FRONTEND, "http://localhost:3000"];

router.post(
  "/upload",
  authenticateJWT,
  cors({ origin: allowedOrigins }),
  upload.single("image"),
  (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).send("No file uploaded.");

    cloudinary.uploader
      .upload_stream({ folder: "blog-posts" }, (error, result) => {
        if (error) return res.status(500).json({ error: "Upload failed" });
        res.json({ imageUrl: result.secure_url });
      })
      .end(file.buffer);
  }
);

export default router;
