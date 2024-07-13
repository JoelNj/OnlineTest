const mongoose = require("mongoose");
const userModel = mongoose.model("User");
const bcrypt = require("bcrypt");
require("dotenv").config();

const addOne = function (req, res) {

    const newUser = req.body;
    const response = { status: process.env.statusOk, message: "" }
    const { password } = req.body;
    bcrypt.genSalt(10).then(
        (salt) => {
            bcrypt.hash(password, salt).then(
                (hash, err) => {
                    if (hash) {
                        newUser.password = hash;
                        userModel.create(newUser).then(
                            (data) => {
                                response.message = data;
                                res.status(response.status).json(response.message);
                            })
                            .then(
                                (err) => {
                                    response.status = process.env.status500;
                                    response.message = err;
                                    res.status(response.status).json(response.message);
                                })
                    }
                    if (err) { return }
                    //  
                }
            ).then(
            ).catch((err) => { console.log(err) })
        }
    )
        .catch((err) => { console.log(err) })


}

const getOne = function (req, res) {

    const { login, password } = req.body;
    const response = { status: process.env.statusOk, message: "" }
    userModel.findOne().exec()
        .then(
            (data) => {
                if (!data) {
                    response.status = process.env.status500;
                    response.messaage = "user not find "
                }
                else {
                    response.message = data;
                }
                res.status(response.status).json(response.message);
            }

        ).catch(
            (err) => {
                response.status = process.env.status500;
                response.message = err;
            }
        )

}

const getAll = function (req, res) {

    userModel.find().exec().then(
        (data) => { return res.status(process.env.statusOk).json(data) }
    )
}

const deleteOne = function (req, res) {

    const response = { status: process.env.statusOk, message: '' }

    const { userId } = req.params;

    userModel.findByIdAndDelete({
        _id:  userId,
    })
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
    addOne,
    getOne,
    getAll,
    deleteOne
}

