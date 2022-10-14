const classServices = require("./class.services");

async function createClass(req, res) {
    let classObj = {
        name: req.body.name,
        section: req.body.section,
        subject: req.body.subject,
        owner: req.user._id,
    };

    try {
        const aclass = await classServices.create(classObj);

        return res.status(201).redirect("/user/dashboard");
    } catch(err) {
        console.log(err);
        if (!err.httpCode) {
            err.httpCode = 500;
            err.msg = "Something went wrong";
        }

        return res.status(err.httpCode).render("user/dashboard", {
            page: "dashboard",
            msg:{
                type: "danger",
                body: err.msg,
            },
        });
    }
}

module.exports = {
    createClass,
}