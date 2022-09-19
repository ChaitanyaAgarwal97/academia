const express = require("express");

let router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuth) return res.redirect("/user/dashboard");
    
    return res.render("home/home", {
        page: "home",
    });
});

module.exports = router;