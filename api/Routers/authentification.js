const express = require("express");
const authentificationController = require("../Controller/authentification")
const authentificationRouter = express.Router();

authentificationRouter.route("/")
    .post(authentificationController.findUser);


module.exports = authentificationRouter