const userServices = require("./user.services");

async function signUp(req, res) {
    const userObj = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    try {
        userServices.addUser(userObj);
    }
    catch(e) {
        res.status(500).send("Something went wrong");
    }
}

async function logIn(req, res) {

}

console.log("hello from ");

module.exports = {
    signUp,
    logIn
};