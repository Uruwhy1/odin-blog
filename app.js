import express from "express";

const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
