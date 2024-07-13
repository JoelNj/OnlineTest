const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to " + "onlineTest")
});
mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected")
});
mongoose.connection.on("Error", (err) => {
    console.log("Mongoose Error" + err)
});

require("./questionModel");
require("./usersModel");