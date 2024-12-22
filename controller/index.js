const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { dbUsers } = require("../model/users");
const { dbMessages } = require("../model/messages");

const isProduction = process.env.NODE_ENV === "production";

const verifyUserCredentials = async (username, password) => {
  const { data, error } = await dbUsers.findByUsername(username);
  if (error) {
    return { verified: false, user: null, error: error.message };
  }
  const user = data[0];
  if (!user) {
    return { verified: false, user: null, error: "User not found" };
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { verified: false, user: null, error: "Invalid password" };

  return { verified: true, user, error: null };
};

exports.verify = (req, res, next) => {
  // Middleware for verifying user's authentication
  const token = req.cookies.token;
  if (!token) return res.status(401).send({ error: "Unauthorized" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.redirect(401, "/login");
  }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };
  const { data, error } = await dbUsers.createUser(newUser);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  res.status(201).json(data);
};

const deletePassFromUserObject = (user) => {
  const { password, ...newUser } = user;
  return newUser;
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const { verified, user, error } = await verifyUserCredentials(
    username,
    password
  );

  if (!verified) {
    res.status(401).json({ error });
  }

  const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });
  res.status(200).json(deletePassFromUserObject(user));
};

exports.token = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send();

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json(user);
  } catch (error) {
    res.redirect(401, "/login");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });
  res.status(200).json({ message: "Logged out" });
};

exports.getMessages = async (req, res) => {
  const { data, error } = await dbMessages.getMessages(req.user.id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};
