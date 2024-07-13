const mongoose = require("mongoose");
const userModel = mongoose.model("User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const findUser = function (req, res) {

    const { login, password } = req.body;
    const response = { status: 201, message: "" }
    userModel.findOne({ "login": login }).then(
        (data) => {
            if (!data) {
                response.message = process.env.userNotFind;
                res.status(process.env.status404).json({"isValid":false,"message":response.message});
            }
            else {
                console.log(req.body)
                bcrypt
                    .hash(password, 10)
                      .then(hash => {
                        bcrypt
                            .compare(password, data.password)
                               .then(resultat => {
                                    if(resultat){
                                        try {
                                            let token = jwt.sign({ name: data.fullname },
                                                "secretkeytouse", { expiresIn: "1h" })
                                            res.json({"isValid":true, "message": token })
                                        }
                                        catch (err) {
                                            res.json({"isValid":false, "message": err })
                                        }
                                    }
                                    else{
                                        res.json({"isValid":false, "message": "password  doesn't match" }) 
                                    }
                            })
                            .catch(err =>  res.json({"isValid":false, "message": err }) )
                    })
                    .catch(err =>  res.json({"isValid":false, "message": err }) )
            }
        })

}

module.exports = {
    findUser
}