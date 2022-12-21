const mongoose = require("mongoose");
require(`dotenv`).config({ debug: true });

const DATABASE_URL = process.env.DATABASE_URL;

const mongooseConnect = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(DATABASE_URL)
    .then(() => console.log("Connected to Mongoose."))
    .catch((err) => console.log(err));
};

module.exports = mongooseConnect;
