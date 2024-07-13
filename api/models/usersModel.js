const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        fullName: String,
        login: String,
        password: String
    }
)
mongoose.model("User", userSchema, "Users");