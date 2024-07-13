const jwt = require("jsonwebtoken")
require("dotenv").config();

const { promisify } = require("util")
module.exports.authenticate = function (req, res, next) {
    const response = {status:process.env.statusOk,message:""};
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]
        const verify = promisify(jwt.verify)
        verify(token,process.env.Secret).then(() => {
            next();
        }).catch((error) => {
            console.log(error)
            response.status=process.env.statusError;
            response.message=process.env.tokenNotValid;
            res.status(response.status).json(response.message)
        })

    } else {
        response.status=process.env.statusNotFind;
        response.message=process.env.messageNotFind;
        res.status(response.status).json(response.message)

    }
}