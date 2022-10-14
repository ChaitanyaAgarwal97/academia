const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    section: {
        type: String,
    },
    subject: {
        type: String,
    },
    code: {
        type: String,
        default: uuidv4().slice(0,6),
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    students: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        }
    ],
});

const Class = new mongoose.model("Class", ClassSchema);


module.exports = Class;