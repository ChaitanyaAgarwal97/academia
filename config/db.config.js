const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.DATABASE_URI).catch((error) =>{
    console.log(error);
});
