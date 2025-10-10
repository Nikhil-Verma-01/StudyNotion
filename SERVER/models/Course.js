const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
    },
    couseDescription:{
        type:String,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingandReviews",
        }
    ],
    price:{
        type:Number,
    },
    thumbnail:{
        type:String,
    },
    tag:{
        type: [String],
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    studentEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        }
    ],
    insturction: {
        type: [String],
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
    }
});

module.exports = mongoose.model("Course", courseSchema);