const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Pleace enter name"]
    },
    email:{
        type: String,
        required: [true, "Pleace enter email"]
    },
    password:{
        type: String,
        required: [true, "Pleace enter password"]
    }
})

module.exports = mongoose.model("User", userSchema)