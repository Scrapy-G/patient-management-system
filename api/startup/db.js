const mongoose = require("mongoose");
const config = require("config");

module.exports = () => {
  mongoose
    .connect(config.get("dbUrl"), {
      auth: {
        username: config.get("dbUsername"),
        password: config.get("dbPassword"),
      },
      authSource: "admin",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB..."));
};
