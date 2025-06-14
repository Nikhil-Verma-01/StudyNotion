const mongoose = require("mongoose");

const ratingandReviewsSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:Number,
        required:true,
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
        index: true,
    }
});

module.exports = mongoose.model("RatingandReviews", ratingandReviewsSchema);