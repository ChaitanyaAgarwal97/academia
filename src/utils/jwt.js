const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function generateToken(payload){
    try{
        let token = jsonwebtoken.sign(payload, process.env.SECRET_KEY);
        return token;
    }catch(err){
        throw err;
    }
}

function tokenVerify(token) {
    try {
        return jsonwebtoken.verify(token, process.env.SECRET_KEY);
    } catch(err) {
        throw err;
    }
}

module.exports = {
    generateToken,
    tokenVerify,
};