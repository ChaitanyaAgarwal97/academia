const express = require('express');
const classController = require("./class.controller.js");
const { auth } = require('../middlewares/auth.common');

let router = express.Router();

router.post("/create", auth, classController.createClass);

module.exports = router;