import prisma from "../prismaClient.js";

export const createComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        userId: req.user.id, // Get the user ID from the authenticated request
        postId: parseInt(postId), // Ensure postId is an integer
      },
    });

    newComment.user = req.user;
    res.status(201).json(newComment);
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

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { content },
    });
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: "Error updating comment" });
  }
};
