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

async function joinClass(req, res) {
    let obj = {
        code: req.body.code,
        student: req.user,
    };

    try {
        await classServices.join(obj);

        return res.status(200).redirect("/user/dashboard");
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

async function getClass(req, res) {
    const classId = req.params.id;
    console.log(req.params)

    try {
        const classObj = await classServices.get(classId);
        return res.status(200).render("class/class", {
            page: "dashboard",
            classObj: classObj,
            announcement: {
                _id: "dfhdhsdasj",
                text: "doihdcdwf",
                last_date: new Date(2022, 12, 21),
                points: 100,
            },
        });
    } catch (error) {
        return res.status(500).render("common/error", {
            error: "Something went wrong"
        })
    }
}

module.exports = {
    createClass,
    joinClass,
    getClass,
}