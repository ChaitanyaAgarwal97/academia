const express = require("express");
const userController = require("./user.controller");

let router = express.Router();

router.get("/", (req, res) => {
    res.render("user/signUp-logIn");
});

router.post("/signUp", userController.signUp);

router.post("/logIn", userController.logIn);


module.exports = router;