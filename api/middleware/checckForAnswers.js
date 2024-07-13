const mongoose = require("mongoose");
const modelAnswer = mongoose.model('Question');


const response = { status: 201, message: '' };
const checkIfAnswerExist = function (req, res, next) {
    
    const response = { status: 201, message: '' }

    const { questionId } = req.params;
    const newAnswer = req.body;

    if( newAnswer.answerIsValid===true){
        console.log("here")
        modelAnswer.findOne({_id:questionId,"answers.answerIsValid":true}).exec()
        .then((data) => {
            if (data) {
                response.status = 400;
                response.message="you already have a data with true as response ";
                res.status(response.status).json({"answerAdded":false,"message":response.message});
            }
            else {
                next();
            }


        })
        .catch(
            (err) => {
                response.status = 500,
                    response.message = err;
                res.status(response.status).json({"answerAdded":false,"message":response.message});
            }
        )

    }
    else{
        console.log("here is ")
        next();
    }
   

    
}

module.exports = {
    checkIfAnswerExist
}