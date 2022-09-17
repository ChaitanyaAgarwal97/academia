require("../../config/db.config");

const User = require('./user.model');
const { hashObj, hashObjCompare } = require("../utils/hash");
const jwt = require("../utils/jwt");

async function addUser(userObj) {
    try {
        if(!userObj.name || !userObj.email || !userObj.password) throw new Error(JSON.stringify({
            httpCode: 400, 
            msg: "Please fill in all details",
        }));

        let user;
        try {
            user = await User.findOne({ email: userObj.email });
        } catch(err) {
            throw new Error(JSON.stringify({
                httpCode: 500, 
                msg: "Something went wrong",
            }));
        }

        if(user) throw new Error(JSON.stringify({
            httpCode: 400, 
            msg: "Account already exists",
        }));

        try {
            userObj.password = await hashObj(userObj.password);

            const newUser = new User(userObj);
            await newUser.save();
            
            return newUser;
        } catch(err) {
            throw new Error(JSON.stringify({
                httpCode: 500, 
                msg: "Something went wrong",
            }));
        }    
    } catch(err) {
        throw err;
    }
}

async function getUser(userObj) {
    try {
        if(!userObj.email || !userObj.password) throw new Error(JSON.stringify({
            httpCode: 400, 
            msg: "Please fill in all credentials",
        }));

        let user;
        try {
            user = await User.findOne({ email: userObj.email });
        } catch(err) {
            throw new Error(JSON.stringify({
                httpCode: 500, 
                msg: "Something went wrong",
            }));
        }

        if(!user) throw new Error(JSON.stringify({
            httpCode: 400, 
            msg: "Incorrect credentials",
        }));
        
        let passwordVerified;
        try {
            passwordVerified = await hashObjCompare(userObj.password, user.password);
        } catch(err) {
            throw new Error(JSON.stringify({
                httpCode: 500, 
                msg: "Something went wrong",
            }));
        }
        
        if(!passwordVerified) throw new Error(JSON.stringify({
            httpCode: 400,
            msg: "Incorrect credentials",
        }));

        let token = jwt.generateToken({ email: user.email });

        user.tokens.push({ token });

        try {
            await user.save();
            return user;
        } catch(err) {
            throw new Error(JSON.stringify({
                httpCode: 500, 
                msg: "Something went wrong",
            }));
        }
    } catch(err) {
        throw err;
    }
}

module.exports = {
    addUser,
    getUser,
};