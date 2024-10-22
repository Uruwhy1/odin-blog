import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

export const authenticateJWT = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// check if post is made by logged-in user
export const authorizePostUpdate = async (req, res, next) => {
  const userId = req.user.id;
  const userRole = req.user.role;
  const postId = parseInt(req.params.id);

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    return res.status(404).json({ error: "Post does not exist." });
  }
  if (userRole === "admin") {
    return next();
  }
  if (post.userId !== userId) {
    return res
      .status(403)
      .json({ error: "You do not have permission to edit this post" });
  }

  next();
};

export const checkUserRole = async (req, res, next) => {
  const userRole = req.user.role.toLowerCase();

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (userRole === "admin" || userRole === "author") {
    return next();
  }

  return res
    .status(403)
    .json({ error: "You do not have permission to access this post." });
};
