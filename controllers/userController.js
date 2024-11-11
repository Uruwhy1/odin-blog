import prisma from "../prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const validateUserInput = (input) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;

  const errors = [];

  if (!input.email || !emailRegex.test(input.email)) {
    errors.push("Invalid email format");
  }
  if (!input.username || !usernameRegex.test(input.username)) {
    errors.push("Invalid username format");
  }
  if (
    input.password &&
    (input.password.length < 6 || input.password.length > 100)
  ) {
    errors.push("Password must be between 6 and 100 characters");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true };
};
const validateLoginInput = (input) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = [];

  if (!input.email || !emailRegex.test(input.email)) {
    errors.push("Invalid email format");
  }
  if (!input.password || input.password.trim() === "") {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true };
};

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

  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    if (!user) return res.status(404).send("user not found");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const validation = validateUserInput({ username, email, password });
    if (!validation.valid) {
      return res.status(400).json({
        error: "Input validation failed",
        details: validation.errors,
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const role = password === process.env.ADMIN_SECRET ? "ADMIN" : "USER";

    const newUser = await prisma.user.create({
      data: {
        username: username.trim(),
        email: email.toLowerCase().trim(),
        password: passwordHash,
        role: role,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (error.code === "P2002") {
      if (error.meta?.target?.includes("username")) {
        return res.status(400).json({ error: "Username already exists" });
      }
      if (error.meta?.target?.includes("email")) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
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
    const validation = validateLoginInput({ email, password });
    if (!validation.valid) {
      return res.status(400).json({
        error: "Input validation failed",
        details: validation.errors,
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        picture: user.picture,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

export const toggleUserRole = async (req, res) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "Unauthorized to modify user roles" });
    }

    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 1) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { role: true },
    });

    const newRole = user.role == "AUTHOR" ? "USER" : "AUTHOR";

    const updatedPost = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        role: newRole,
      },
    });

    res.json({
      message: `User role updated successfully.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update user role." });
  }
};
