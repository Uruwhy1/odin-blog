import express from "express";

import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";

const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
