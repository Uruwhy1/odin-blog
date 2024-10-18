import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export const authorizeUserUpdate = async (req, res, next) => {
  const userIdFromToken = req.user.id;
  const userIdToUpdate = parseInt(req.params.id);

  if (userIdFromToken !== userIdToUpdate) {
    return res
      .status(403)
      .json({ error: "You do not have permission to edit this user." });
  }

  next();
};
