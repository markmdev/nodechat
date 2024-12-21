const express = require("express");
const { getMessages, verify } = require("../controller");

const router = express.Router();

router.get("/getmessages", verify, getMessages);

module.exports = router;
