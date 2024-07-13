const express = require("express");
const questionController = require("../Controller/questionController");
const { authenticate } = require("../middleware/checkToken");
const questionRouter = express.Router();


questionRouter.route("/")
    .get(questionController.getAll)
    .post(authenticate, questionController.addOne);

questionRouter.route("/:questionId")
    .get(questionController.getOne)
    .put(authenticate, questionController.updateOne)
    .delete(authenticate,questionController.deleteOne)
module.exports = questionRouter 