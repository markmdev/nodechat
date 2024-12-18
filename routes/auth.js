const express = require("express");
const { register, login, token, logout } = require("../controller");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/token", token);

module.exports = router;
