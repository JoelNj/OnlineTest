
const mongoose = require("mongoose");

const answer = mongoose.Schema({
    answerText: String,
    answerIsValid: Boolean
})

const questionSchema = mongoose.Schema(
    {
        questionText: String,
        questionDate: {
            type: Date,
            default: mongoose.now()
        },
        answers: [answer]
    }
);


mongoose.model("Question", questionSchema, "Questions");