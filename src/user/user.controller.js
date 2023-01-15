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

async function logOut(req, res) {
    if (!req.isAuth) return res.status(400).redirect("/");

    try {
        let reqObj = {
            user: req.user,
            token: req.cookies.ljwt,
        };

        await userServices.logOut(reqObj);

        return res.clearCookie("ljwt").redirect("/");
    } catch(error) {
        console.log(error);
        
        return res.status(500).render("common/error", {
            error: "Error 500! Sorry, something went wrong.",
        });
    }    
}

async function dashboard(req, res) {
    if (req.isAuth) {
        popObj = {
            user: req.user,
            paths: [
                {
                    path: "classes_joined",
                    select: "name subject section",
                },
                {
                    path: "classes_owned",
                    select: "name subject section",
                },
            ],
        };
        let { _doc: { tokens, password, _id, __v, ...user } } = await userServices.classPopulate(popObj);

        return res.render("user/dashboard", {
            page: "dashboard",
            user: user,
        });
    } 

    return res.redirect("/");
}

async function updateProfile(req, res) {
    
}

module.exports = {
    signUp,
    logIn,
    dashboard,
    logOut,
    updateProfile,
};