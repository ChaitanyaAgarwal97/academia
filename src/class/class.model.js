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
        default: function() {
            let code = '';
            uuidv4().split("-").map((value) => {
                code += value.slice(0,3);
            }).toString();
            return code.slice(0, (Math.random() * 100) % 2 == 0 ? 6 : 8);
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
});

const Class = new mongoose.model("Class", ClassSchema);


module.exports = Class;