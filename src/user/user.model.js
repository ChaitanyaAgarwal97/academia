const bcryptjs = require("bcryptjs");
const mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
            }
        }
    ],
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;