
const mongoose = require("mongoose");
const questionModel = mongoose.model("Question");
require("dotenv").config();

const getAll = function (req, res) {

    const response = { status: process.env.statusOk, message: "" };
    const questionId = req.params.questionId;

    questionModel.findById(questionId).select("answers").exec()
        .then((data) => {
            response.message = data.answers;
            res.status(response.status).json(response.message);
           }
        )
        .catch((err) => {
            response.message = err;
            response.status = process.env.status500;
            res.status(response.status).json(response.message);
        })
        
}

const addOne = function (req, res) {

    const response = { status: process.env.statusOk , message: '' }
    const newAnswer = req.body;
    const { questionId } = req.params;
    questionModel.findOneAndUpdate({ _id: questionId },
        { $push: { "answers": newAnswer } })
        .then((data) => {
            response.message = data;
            res.status(response.status).json({"answerAdded":true,"message":response.message.answers.slice(-1)});
        })
        .catch(
            (err) => {
                response.status = process.env.status500 ,
                    response.message = err;
                res.status(response.status).json({"answerAdded":false,"message":err.message});
            }
        )

}


const getOne = function (req, res) {

    const response = { status: process.env.statusOk, message: '' }
    const { questionId, answerId } = req.params;
    questionModel.findOne(
        { _id: questionId, "answers._id": answerId },
        { "answers.$": 1 }
    ).exec()
        .then((data) => {
            response.message = data;
            res.status(response.status).json(response);
        })
        .catch(
            (err) => {
                response.status = process.env.status500,
                    response.message = err;
                res.status(response.status).json(response);
            }
        )

}

const updateOne = function (req, res) {

    const response = { status: process.env.statusOk , message: '' }
    const newAnswer = req.body;
    const { questionId, answerId } = req.params;

    const query = {}

    if (req.body && req.body.answerText) { query["answerText"] = req.body.answerText }
    if (req.body && req.body.answerIsValid) { query["answerIsValid"] = req.body.answerIsValid }

    questionModel.findOneAndUpdate({ _id: questionId, "answers._id": answerId }, { $set: { "answers.$": query } })
        .then((data) => {
            response.message = data;
            res.status(response.status).json({ message: data });
        })
        .catch(
            (err) => {
                response.status = process.env.status500,
                    response.message = err;
                res.status(response.status).json(response);
            }
        )
}

const deleteOne = function (req, res) {

    const response = { status: process.env.statusOk, message: '' }

    const { questionId, answerId } = req.params;

    questionModel.findByIdAndUpdate({
        _id: questionId,
    },
        { $pull: { "answers": { "_id": answerId } } })
        .then((data) => {
            response.message = data;
            res.status(response.status).json({ message: data });
        })
        .catch(
            (err) => {
                response.status = process.env.status500,
                    response.message = err;
                res.status(response.status).json(response);
            }
        )


}


module.exports = {

    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne
}

