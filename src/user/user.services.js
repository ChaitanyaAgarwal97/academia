require("../db.conn");

const User = require('./user.model');
const { hashObj, hashObjCompare } = require("../utils/hash");
const jwt = require("../utils/jwt");
const { HttpResponseError } = require("../utils/error.helper");
const Class = require("../class/class.model");

async function addUser(userObj) {
    try {
        if(!userObj.name || !userObj.email || !userObj.password) throw new HttpResponseError({
            httpCode: 400, 
            msg: "Please fill in all details",
        });

        
        user = await User.findOne({ email: userObj.email });

        if(user) throw new HttpResponseError({
            httpCode: 400, 
            msg: "Account already exists",
        });

        userObj.password = await hashObj(userObj.password);

        const newUser = new User(userObj);
        await newUser.save();
            
        return newUser;    
    } catch(err) {
        throw err;
    }
}

async function getUser(userObj) {
    try {
        if(!userObj.email || !userObj.password) throw new HttpResponseError({
            httpCode: 400, 
            msg: "Please fill in all credentials",
        });

        
        user = await User.findOne({ email: userObj.email });

        if(!user) throw new HttpResponseError({
            httpCode: 400, 
            msg: "Incorrect credentials",
        });
        
        
        passwordVerified = await hashObjCompare(userObj.password, user.password);
        
        if(!passwordVerified) throw new HttpResponseError({
            httpCode: 400,
            msg: "Incorrect credentials",
        });

        let token = jwt.generateToken({ email: user.email });

        user.tokens.push({ token });

        await user.save();
        return user;
    } catch(err) {
        throw err;
    }
}

async function logOut(reqObj) {
    try {
        reqObj.user.tokens = reqObj.user.tokens.filter(ele => {
            return ele.token != reqObj.token;
        });

        await reqObj.user.save();

        return;
    } catch(err) {
        throw err;
    }
}

async function addOwnedClass(userId, classId) {
    try {
        let user = await User.findById(userId);
        
        user.classes_owned.push(classId);

        await user.save();
    } catch(err) {
        throw err;
    }
}

async function addJoinedClass(user, classId) {
    try {
        user.classes_joined.push(classId);
        
        await user.save();
    } catch(err) {
        throw err;
    }
}

async function classPopulate({ user, paths }) {
    return await user.populate(paths);
}

async function updateUser(oldUserObj, newUserObj) {
    try {
        if(!newUserObj.name.trim().length || !newUserObj.email.trim().length) throw new HttpResponseError({
            httpCode: 400, 
            msg: "Please fill in all details",
        });

        if (oldUserObj.email !== newUserObj.email) {
            let user = await User.findOne({ email: newUserObj.email });

            if(user) throw new HttpResponseError({
                httpCode: 400, 
                msg: "Account already exists",
            });
        }
        

        if (oldUserObj.password !== newUserObj.password) newUserObj.password = await hashObj(newUserObj.password);

        const updatedUser = await User.findByIdAndUpdate(oldUserObj._id, newUserObj);

        return updatedUser;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    addUser,
    getUser,
    logOut, 
    addOwnedClass,
    addJoinedClass,
    classPopulate,
    updateUser,
};