const express = require("express");
require("dotenv").config();
const cors = require("cors")
require("./api/models/db");
const bodyParser = require("body-parser");
const userRouter = require("./api/Routers/userRouter");
const questionRouter = require("./api/Routers/questionRouter");
const answerRouter = require("./api/Routers/answerRouter");
const authRouter = require("./api/Routers/authentification");
const router = require("./api/Routers");

const app = express();

app.use("/api", function (req, res, next) {
    res.header('Access-Control-Allow-Origin',
        'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, XRequested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors({ origin: process.env.Origin }));

//

app.use("/api",router);

// app.use(process.env.questionRout, questionRouter);
// app.use(process.env.answerRout, answerRouter);
// app.use(process.env.UserRout, userRouter);
// app.use(process.env.Auth, authRouter);



app.listen(process.env.PORT, () => { console.log("serveur running in port " + process.env.PORT) });