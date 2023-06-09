const mongoose = require("mongoose");

const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const MONGO_INITDB_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const MONGO_IP = process.env.MONGO_IP;
const MONGO_PORT = process.env.MONGO_PORT;

mongoose.set("strictQuery", true);
mongoose.connect(
    `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_IP}:${MONGO_PORT ?? 27017}/academia?authSource=admin`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
  .then((msg) => {
    console.log("success");
  })
  .catch((error) => {
    console.log(error);
  });
