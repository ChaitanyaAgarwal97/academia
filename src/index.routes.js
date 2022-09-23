const express = require("express");

let router = express.Router();

router.get("*", (req, res) => {
    res.status(404).render("common/error", {
        error: "Error 404! Page not Found.",
    });
});

module.exports = router;