import express from "express";

import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import uploadRouter from "./routes/upload.js";
import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  process.env.ADMIN_FRONTEND,
  process.env.FRONTEND,
];

const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(
  cors({
    origin: (origin, callback) => {
      console.log(origin);
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json({ limit: "10mb" }));

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/posts/:postId/comments", commentRouter);
app.use("/", uploadRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
