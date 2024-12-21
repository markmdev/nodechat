const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { dbUsers } = require("../model/users");
const { dbMessages } = require("../model/messages");

exports.verify = (req, res, next) => {
  // Middleware for verifying user's authentication
  const token = req.cookies.token;
  if (!token) return res.status(401).send({ error: "Unauthorized" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
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
  const { data, error } = await dbUsers.findByUsername(username);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  const user = data[0];
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true });
  res.status(200).json(deletePassFromUserObject(user));
};

exports.token = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send();

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out" });
};

exports.getMessages = async (req, res) => {
  const { data, error } = await dbMessages.getMessages(req.user.id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};
