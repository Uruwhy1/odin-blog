import prisma from "../prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    if (users.length === 0) {
      return res.status(404).send("There are no users created!"); // Use 404 Not Found for clarity
    }
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const fetchUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    console.log(id);
    if (!user) return res.status(404).send("user not found");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: passwordHash,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === "P2002") {
      if (error.meta.target.includes("username")) {
        return res.status(400).json({ error: "Username already exists" });
      }
      if (error.meta.target.includes("email")) {
        return res.status(400).json({ error: "Email already exists" });
      }

      res.status(500).json({ error: "Error creating user" });
    }
  }
};

export const updateUser = async (req, res) => {
  const { username, email, password } = req.body;
  const userId = req.user.id;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        email,
        password: password ? await bcrypt.hash(password, 10) : undefined,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.user.id;

  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};
