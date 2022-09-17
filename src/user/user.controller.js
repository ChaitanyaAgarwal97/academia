const userServices = require("./user.services");

async function signUp(req, res) {
    const userObj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    try {
        const user = await userServices.addUser(userObj);

        return res.status(201).send("User Created");
    } catch(err) {
        err = JSON.parse(err.message); 
        console.table(err);

        return res.status(err.httpCode).send(err.msg);
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
        }).send("Logged In");
    } catch(err) {
        err = JSON.parse(err.message); 
        console.table(err);

        return res.status(err.httpCode).send(err.msg);
    }
}

module.exports = {
    signUp,
    logIn,
};