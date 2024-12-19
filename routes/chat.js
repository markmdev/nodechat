const express = require("express");
const { getMessages } = require("../controller");

const router = express.Router();

router.get("/getmessages", getMessages);

module.exports = router;
