require("../../config/db.config");

const User = require('./user.model');
const { hashObj, hashObjCompare } = require("../utils/hash");
const jwt = require("../utils/jwt");
const { HttpResponseError } = require("../utils/error.helper");

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

module.exports = {
    addUser,
    getUser,
};