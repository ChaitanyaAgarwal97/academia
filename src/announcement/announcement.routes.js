const express = require("express");
const announcementController = require("./announcement.controller");
const { auth } = require("../middlewares/auth.common");

let router = express.Router();

router.post("/create", auth, announcementController.createAnnouncement);
router.post("/delete", auth, announcementController.deleteAnnouncement);

module.exports = router;
