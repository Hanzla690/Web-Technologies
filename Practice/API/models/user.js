const mongoose = require("mongoose")

let userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: Number
}, {versionKey: false})

let User = mongoose.model("User", userSchema)

module.exports = User