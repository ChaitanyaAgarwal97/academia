const express = require("express");
const userController = require("./user.controller");
const { auth } = require("../middlewares/auth.common");

let router = express.Router();

router.get("/", auth, (req, res) => {
    if(req.isAuth) return res.redirect("/user/dashboard");

    return res.render("user/signUp-logIn");
});

router.post("/signUp", userController.signUp);

router.post("/logIn", userController.logIn);

router.get("/logOut", userController.logOut);

router.get("/dashboard", userController.dashboard);


module.exports = router;