import prisma from "../prismaClient.js";
import { escape } from "html-escaper";

const sanitizeComment = (comment) => ({
  ...comment,
  content: escape(comment.content),
  user: comment.user
    ? {
        ...comment.user,
        username: escape(comment.user.username),
      }
    : null,
});

export const createComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const sanitizedContent = content.trim();

    const newComment = await prisma.comment.create({
      data: {
        content: sanitizedContent,
        userId: req.user.id,
        postId: parseInt(postId),
      },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    res.status(201).json(sanitizeComment(newComment));
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating comment" });
  }
};

export const fetchCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) },
      include: { user: { select: { username: true } } },
    });
    if (comments.length === 0)
      return res.status(404).send("No comments found for this post.");

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
