import prisma from "./prismaClient.js";

const createTemplatePosts = async () => {
  const templatePosts = [
    {
      title: "Top 10 Coding Languages in 2024",
      summary:
        "Explore the programming languages that are expected to dominate the tech industry this year.",
      content: "",
      imageLink:
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 12,
      showCarousel: true,
    },
    {
      title: "Sustainable Living: Simple Changes",
      summary:
        "Find out how small changes in your daily life can contribute to a more sustainable future.",
      content: "",
      imageLink:
        "https://cdn-kabof.nitrocdn.com/nfjHFOYSVknMSLxSPIZUhvuJiKcRMGGc/assets/images/optimized/rev-e8eae3c/advertisingweek.com/wp-content/uploads/2022/03/169environment-concept-globe-glass-in-green-forest-with-sunlight-picture-id1309463809.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 14,
    },
    {
      title: "Understanding Cryptocurrency",
      summary:
        "A beginner's guide to cryptocurrency, how it works, and its potential impact on the economy.",
      content: "",
      imageLink:
        "https://penntoday.upenn.edu/sites/default/files/2022-01/cryptocurrency-main.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 14,
    },
    {
      title: "The Art of Mindfulness",
      summary:
        "An introduction to mindfulness practices and how they can improve your mental health.",
      content: "",
      imageLink:
        "https://media.cnn.com/api/v1/images/stellar/prod/220531190304-woman-meditation-stock.jpg?c=original",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 14,
    },
    {
      title: "Traveling the World: Tips and Tricks",
      summary:
        "Discover essential tips for making the most of your travels around the world.",
      content: "",
      imageLink:
        "https://bbaesthetic.com/wp-content/uploads/2022/08/young-girl-tourist-travels-2022-01-19-00-23-44-utc.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 12,
      showCarousel: true,
    },
    {
      title: "Fitness: Staying Motivated",
      summary:
        "Tips and strategies for staying motivated on your fitness journey.",
      content: "",
      imageLink:
        "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?cs=srgb&dl=pexels-leonardho-1552252.jpg&fm=jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 15,
    },
    {
      title: "The Importance of Mental Health",
      summary:
        "Discussing the significance of mental health awareness and resources available.",
      content: "",
      imageLink:
        "https://ca-times.brightspotcdn.com/dims4/default/cd10d8e/2147483647/strip/true/crop/2000x1333+0+0/resize/2000x1333!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8e%2Fb7%2F99beae9a4be0bbced1487b04b619%2Fla-hm-nyny-mental-health.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 15,
    },
    {
      title: "The Benefits of Reading",
      summary:
        "Exploring how reading can enrich your life and improve your mental well-being.",
      content: "",
      imageLink:
        "https://www.uopeople.edu/wp-content/uploads/2022/06/blaz-photo-zMRLZh40kms-unsplash-scaled.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 15,
      showCarousel: true,
    },
  ];

  try {
    const createdPosts = await prisma.post.createMany({
      data: templatePosts,
    });
    console.log(`${createdPosts.count} template posts created!`);
  } catch (error) {
    console.error("Error creating template posts:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createTemplatePosts();
