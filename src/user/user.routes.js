const express = require("express");
const userController = require("./user.controller");
const { auth } = require("../middlewares/auth.common");

let router = express.Router();

router.get("/", auth, (req, res) => {
    if(req.isAuth) return res.send("U are already Logged In");

    return res.render("user/signUp-logIn");
});

router.post("/signUp", userController.signUp);

router.post("/logIn", userController.logIn);


module.exports = router;