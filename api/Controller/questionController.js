const mongoose = require("mongoose");
const questionModel = mongoose.model("Question");
require("dotenv").config();


const addOne = function (req, res) {
    const newQuestion = req.body;
    const response = { status: process.env.statusOk, message: "" };
    questionModel.create(newQuestion)
        .then((data) => {
            response.message = data;
            return res.status(response.status).json(response);
        })
        .catch((err) => {
            response.message = err;
            response.status = process.env.status500;
            return res.status(response.status).json(response);
        })
}

const getOne = function (req, res) {
    const response = { status: process.env.statusOk, message: "" };
    const questionId = req.params.questionId;
    questionModel.findOne({ _id: questionId }).exec()
        .then((data) => {
            response.message = data;
            res.status(response.status).json(response.message);
        })
        .catch((err) => {
            response.status = process.env.status500, response.message = err;
            res.status(response.status).json(response);
        })
}

const getAll = function (req, res) {

    const response = { status: process.env.statusOk, message: "" };
    const page = parseInt(req.query.page, process.env.limit);
    let limit = parseInt(req.query.count, process.env.limit);
    let offset = parseInt(((page * limit) - limit), process.env.limit);
    if (req.query && req.query.page) {
        questionModel.countDocuments({}).then(
            (countItem) => {
                
                questionModel.find({}).skip(offset).limit(limit).exec()
                    .then((data) => {
                        response.message = data;
                        res.status(response.status).json({ message: response.message, "count": countItem });
                    })
                    .catch((err) => {
                        response.status = process.env.status500;
                        response.message = err;
                        res.status(response.status).json(response)
                    })
                    .finally()
                }
            )
    }
    else {
        questionModel.countDocuments({}).then(
            (countItem) => {
        questionModel.find({}).exec()
            .then((data) => {
                response.message = data;
                questionModel.countDocuments({}).then(
                    response.message = data,
                    res.status(response.status).json({ message: response.message, "count": countItem })
                )
            })
            .catch((err) => {
                response.status = process.env.status500;
                response.message = err;
                res.status(response.status).json(response)
            })
            .finally()
        })
    }


}

const deleteOne = function (req, res) {

    const response = { status: process.env.statusOk , message: "" };
    const questionId = req.params.questionId;
    questionModel.findByIdAndDelete(questionId).then(
        (data) => {
            response.message = data;
            res.status(response.status).json(response);
        }
    ).catch(
        (err) => {
            response.status = process.env.status500;
            response.message = err;
            res.status(response.status).json(response);
        }

    )
}

const updateOne = function (req, res) {

    const response = { status: process.env.statusOk, message: "" };
    const questionId = req.params.questionId;
    const query = {}

    if (req.body.questionText) { query["questionText"] = req.body.questionText }

    questionModel.findByIdAndUpdate({ _id: questionId }, { $set: query })
        .then((data) => {
            response.message = data;
            res.status(response.status).json(response);
        })
        .catch((err) => {
            response.message = err;
            response.status = process.env.statusError;
            res.status(response.status).json(response);
        })

}


module.exports = {
    getAll,
    addOne,
    getOne,
    deleteOne,
    updateOne
}