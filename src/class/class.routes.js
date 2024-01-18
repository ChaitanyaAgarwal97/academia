const express = require("express");
const classController = require("./class.controller.js");
const { auth } = require("../middlewares/auth.common");

let router = express.Router();

router.post("/create", auth, classController.createClass);

router.post("/join", auth, classController.joinClass);

router.get("/get/:id", auth, classController.getClass);

router.post("/remove-student", auth, classController.removeStudent);

module.exports = router;
