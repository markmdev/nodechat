const express = require("express");
const { register, login, token } = require("../controller");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/token", token);

module.exports = router;
