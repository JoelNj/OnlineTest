const express = require("express");
const answerRouter = express.Router({ mergeParams: true });
const answersController = require("../Controller/answerController");
const checkForAnswer = require("../middleware/checckForAnswers");
const { authenticate } = require("../middleware/checkToken");

answerRouter.route("/:answerId")
    .get(answersController.getOne)
    .put(authenticate, answersController.updateOne)
    .delete(authenticate, answersController.deleteOne);

answerRouter.route("/")
    .post(authenticate,checkForAnswer.checkIfAnswerExist,answersController.addOne)
    .get(answersController.getAll)
module.exports = answerRouter