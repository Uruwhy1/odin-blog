import prisma from "./prismaClient.js";

const createTemplatePosts = async () => {
  const templatePosts = [
    {
      title: "Sustainable Living: Simple Changes",
      summary:
        "Find out how small changes in your daily life can contribute to a more sustainable future.",
      content: `## Introduction
Living sustainably doesn't have to mean a complete lifestyle overhaul. Small, simple changes can collectively contribute to a healthier planet.

## 1. Reduce Single-Use Plastics
By bringing your own reusable bags, bottles, and containers, you can minimize waste.

## 2. Conserve Water and Energy
Simple practices, like turning off lights when not in use and taking shorter showers, help conserve valuable resources.

## 3. Support Local and Sustainable Brands
Choose products from companies that prioritize ethical and sustainable practices. Small purchases can make a big difference.

Together, these small changes can lead to a more sustainable future.`,
      imageLink:
        "https://cdn-kabof.nitrocdn.com/nfjHFOYSVknMSLxSPIZUhvuJiKcRMGGc/assets/images/optimized/rev-e8eae3c/advertisingweek.com/wp-content/uploads/2022/03/169environment-concept-globe-glass-in-green-forest-with-sunlight-picture-id1309463809.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 5,
    },
    {
      title: "Understanding Cryptocurrency",
      summary:
        "A beginner's guide to cryptocurrency, how it works, and its potential impact on the economy.",
      content: `Cryptocurrency is a digital form of currency that relies on blockchain technology to secure transactions. Here, we'll break down the basics.

## What is Cryptocurrency?
Cryptocurrency is decentralized, meaning it’s not controlled by any government or financial institution.

## Benefits
- **Security:** Blockchain technology ensures each transaction is securely recorded.
- **Transparency:** Each transaction is publicly visible on the blockchain.

Cryptocurrency holds the potential to revolutionize the way we handle money, making it worth understanding.`,
      imageLink:
        "https://penntoday.upenn.edu/sites/default/files/2022-01/cryptocurrency-main.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 6,
    },
    {
      title: "The Art of Mindfulness",
      summary:
        "An introduction to mindfulness practices and how they can improve your mental health.",
      content: `Mindfulness is about being present in the moment, fully aware of your thoughts and surroundings.

## Why Practice Mindfulness?
Mindfulness helps reduce stress, improves focus, and fosters emotional balance.

## Simple Techniques
- **Breathing Exercises:** Focus on deep breathing to ground yourself.
- **Body Scans:** Notice the sensations in each part of your body.

Embracing mindfulness can bring greater clarity and peace to your life.`,
      imageLink:
        "https://media.cnn.com/api/v1/images/stellar/prod/220531190304-woman-meditation-stock.jpg?c=original",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 5,
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
      userId: 6,
      showCarousel: true,
    },
    {
      title: "Fitness: Staying Motivated",
      summary:
        "Tips and strategies for staying motivated on your fitness journey.",
      content: `Maintaining fitness motivation can be challenging, but with the right strategies, you can stay on track.

## Set Realistic Goals
Break down large fitness goals into smaller, achievable milestones.

## Track Your Progress
Keeping a journal of your workouts and achievements can help you see your progress.

## Find an Accountability Partner
Exercising with a friend or joining a fitness group can provide support and motivation.

With determination and these tips, you can stay committed to your fitness journey.`,
      imageLink:
        "https://images.pexels.com/photos/252252/pexels-photo-1552252.jpeg?cs=srgb&dl=pexels-leonardho-1552252.jpg&fm=jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 6,
    },
    {
      title: "The Importance of Mental Health",
      summary:
        "Discussing the significance of mental health awareness and resources available.",
      content: `Mental health is as important as physical health and should be prioritized.

## Why It Matters
Good mental health is essential for personal well-being, productivity, and meaningful relationships.

## Seeking Help
Resources like therapy and counseling can provide support for those facing mental health challenges.

Breaking the stigma around mental health is crucial for a supportive society.`,
      imageLink:
        "https://ca-times.brightspotcdn.com/dims4/default/cd10d8e/217483647/strip/true/crop/2000x1333+0+0/resize/2000x1333!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8e%2Fb7%2F99beae9a4be0bbced1487b04b619%2Fla-hm-nyny-mental-health.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 5,
    },
    {
      title: "The Benefits of Reading",
      summary:
        "Exploring how reading can enrich your life and improve your mental well-being.",
      content: `
Reading is one of the most enriching activities you can engage in. Whether you prefer fiction, non-fiction, or poetry, the habit of reading offers numerous benefits for your mental well-being and personal development. In this article, we will explore how reading can improve your life in meaningful ways.

## 1. Enhances Cognitive Function

Reading regularly engages your brain, helping improve your memory, focus, and problem-solving skills. Studies have shown that reading can slow down cognitive decline as we age, keeping the brain sharp and active.

> "A reader lives a thousand lives before he dies... The man who never reads lives only one."  
> – George R.R. Martin

## 2. Reduces Stress and Promotes Relaxation

Reading a good book can provide an escape from the daily stresses of life. Getting lost in a fictional world or exploring new ideas helps shift your focus and lowers your stress levels.

### Pro Tip:
Try setting aside 30 minutes before bedtime to read. Studies show that reading a book (instead of looking at screens) promotes better sleep quality.

## 3. Increases Empathy and Emotional Intelligence

When you immerse yourself in stories about different characters and experiences, you gain a deeper understanding of human emotions. This helps build empathy, making you more compassionate and emotionally aware in real life.

- Fiction books offer an inside look into other people’s perspectives.  
- Non-fiction and memoirs help you learn from real-life challenges and triumphs.

## 4. Expands Knowledge and Vocabulary

Reading exposes you to new words, ideas, and concepts. This naturally improves your vocabulary and helps you express yourself better. The more you read, the more knowledge you gain, which can help in both personal conversations and professional environments.

## 5. Strengthens Mental Stamina

Longer books, such as novels or complex non-fiction, require sustained attention. Reading these books trains your brain to focus for longer periods, improving your ability to concentrate on tasks.

---

### Conclusion

The benefits of reading extend beyond entertainment. It sharpens your mind, reduces stress, builds empathy, and enriches your understanding of the world. So, whether it's a paperback, an e-book, or an audiobook, pick up something to read today and experience the positive impact it can have on your life.
.`,
      imageLink:
        "https://www.uopeople.edu/wp-content/uploads/2022/06/blaz-photo-zMRLZh40kms-unsplash-scaled.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 6,
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
