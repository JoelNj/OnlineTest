const express = require("express");
const userRouter = express.Router({ mergeParams: true });
const userController = require("../Controller/userController");


userRouter.route("/")
    .get(userController.getAll)
    .post(userController.addOne)
userRouter.route("/:userId")
   .delete(userController.deleteOne)

module.exports = userRouter