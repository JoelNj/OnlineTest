const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const userRouter = require("./Routers/userRouter");
const questionRouter = require("./Routers/questionRouter");
const answerRouter = require("./Routers/answerRouter");
const authRouter = require("./Routers/authentification")
const router = express.Router();

router.use(process.env.questionRout, questionRouter);
router.use(process.env.answerRout, answerRouter);
router.use(process.env.UserRout, userRouter);
router.use("/api/login", authRouter);



module.exports=router;


