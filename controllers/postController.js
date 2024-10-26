import prisma from "../prismaClient.js";

export const createPost = async (req, res) => {
  const { title, content, imageLink, showCarousel, summary } = req.body;
  const userId = req.user.id;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        summary,
        content,
        imageLink,
        userId,
        showCarousel,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating posts:", error);
    res.status(500).json({ error: "Error creating post" });
  }
};

export const fetchAllPosts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 8;
  const page = parseInt(req.query.page) || 1;
  const carousel = req.query.carousel === "true";

  try {
    const posts = await prisma.post.findMany({
      where: carousel ? { showCarousel: true } : {},
      include: {
        content: false,
        updatedAt: false,
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    if (posts.length === 0) return res.status(404).send("no posts available!");

    const totalPosts = await prisma.post.count();
    res.json({ posts, totalPosts });
  } catch (error) {
    console.error("error fetching posts:", error);
    res.status(500).json({ error: "internal server error" });
  }
};

export const fetchSinglePost = async (req, res) => {
  const postId = parseInt(req.params.id);

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        comments: true,
      },
    });

    if (!post) return res.status(404).send("Post not found!");

    res.json(post);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content, imageLink, showCarousel } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: Number(postId) },
      data: {
        title,
        content,
        imageLink,
        showCarousel,
      },
    });

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Error updating post" });
  }
};

export const deletePost = async (req, res) => {
  const postId = parseInt(req.params.id);

  try {
    await prisma.post.delete({
      where: { id: postId },
    });

    res.status(204).send("Post Deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting post" });
  }
};
