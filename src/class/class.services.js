require("../../config/db.config");

const Class = require("./class.model");
const { HttpResponseError } = require("../utils/error.helper");
const { addOwnedClass } = require("../user/user.services");

async function create(classObj) {
    try {
        if (!classObj.name || !classObj.owner) throw new HttpResponseError({
            httpCode: 400,
            msg: "Please fill in all details",
        });
        
        let newClass = new Class(classObj);
        await newClass.save();

        await addOwnedClass(classObj.owner, newClass._id);

        return newClass;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    create,
}