import prisma from "../prismaClient.js";

export const createPost = async (req, res) => {
  const { title, content, imageLink, showCarousel, summary } = req.body;
  const userId = req.user.id;

  if (req.user.role == "USER")
    res.status(403).json({ error: "Access denied: insufficient permissions" });

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
  try {
    const options = {
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
    };

    const posts = await prisma.post.findMany(options);
    if (posts.length === 0) return res.status(404).send("No posts available!");

    const totalPosts = await prisma.post.count();
    res.json({ posts, totalPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const fetchPublishedPosts = async (req, res) => {
  const { limit, page } = req.query;
  const carousel = req.query.carousel === "true";

  try {
    const options = {
      where: {
        published: true,
        ...(carousel && { showCarousel: true }),
      },
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
    };

    if (limit) options.take = parseInt(limit);
    if (page && limit) options.skip = (parseInt(page) - 1) * options.take;

    const posts = await prisma.post.findMany(options);

    if (posts.length === 0) return res.status(404).send("No posts available!");

    const totalPosts = await prisma.post.count();
    res.json({ posts, totalPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const fetchUserPosts = async (req, res) => {
  const { limit, page } = req.query;
  let userId = parseInt(req.params.userId);

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const options = {
      where: { userId },
      include: {
        content: false,
        updatedAt: false,
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: { id: "desc" },
    };

    if (limit) options.take = parseInt(limit);
    if (page && limit) options.skip = (parseInt(page) - 1) * options.take;

    const posts = await prisma.post.findMany(options);

    if (posts.length === 0) return res.status(404).send("No posts available!");

    const totalPosts = await prisma.post.count({ where: { userId } });
    res.json({ posts, totalPosts });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ error: "Internal server error" });
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

export const togglePublishStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: { published: true },
    });

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        published: !post.published,
      },
    });

    res.json({
      message: `Post ${
        updatedPost.published ? "published" : "unpublished"
      } successfully.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update post status." });
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
