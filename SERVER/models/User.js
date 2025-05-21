const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    accountType:{
        type: String,
        required: true,
    },
    additionalDetails:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    }],
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],
    image:{
        type: String,
        required: true,
    },
    token:{
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    courseProgress:{
        type: String,
        required: true,
    }

});

module.exports = mongoose.model("User", userSchema)