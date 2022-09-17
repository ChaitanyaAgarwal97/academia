const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.DATABASE_URI)
.then((msg) => {
    console.log('success');
})
.catch((error) =>{
    console.log(error);
});
