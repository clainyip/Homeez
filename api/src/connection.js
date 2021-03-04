const mongoose = require("mongoose");

const Info = require("./model/Information.model").default;

const connection = "mongodb://mongo:27017/mongo-test";

const connectDb = () => {
  return mongoose.connect(connection);
};

module.exports = connectDb;
