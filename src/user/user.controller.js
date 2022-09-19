const e = require("express");
const userServices = require("./user.services");

async function signUp(req, res) {
    const userObj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    try {
        const user = await userServices.addUser(userObj);

        return res.status(201).render("user/signUp-logIn", {
            msg: {
                type: "success",
                body: "Account Created Successfully!",
            },
        });
    } catch(err) {
        console.table(err);
        if (!err.httpCode) {
            err.httpCode = 500;
            err.msg = "Something went wrong";
        }

        return res.status(err.httpCode).render("user/signUp-logIn", {
            msg:{
                type: "danger",
                body: err.msg,
            },
        });
    }
}

async function logIn(req, res) {
    const userObj = {
        email: req.body.email,
        password: req.body.password,
    };

    try {
        const user = await userServices.getUser(userObj);

        return res.status(200).cookie("ljwt", user.tokens[user.tokens.length - 1].token, {
            maxAge: 2592000000,
            overwrite: true,
            httpOnly: true,
        }).redirect("/user/dashboard");
    } catch(err) {
        if (!err.httpCode) {
            err.httpCode = 500;
            err.msg = "Something went wrong";
        }

        return res.status(err.httpCode).render("user/signUp-logIn", {
            msg:{
                type: "danger",
                body: err.msg,
            },
        });
    }
}

function dashboard(req, res) {
    if (req.isAuth) return res.render("user/dashboard", {
        page: "dashboard",
        user: req.user,
    });

    return res.redirect("/");
}

module.exports = {
    signUp,
    logIn,
    dashboard,
};