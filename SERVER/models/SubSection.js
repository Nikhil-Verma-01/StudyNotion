const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    timeDuration:{
        type:String,
    },
    descritption:{
        type:String,
    },
    videoUrl:{
        type:String,
    },
});

module.exports = mongoose.models.SubSection || mongoose.model("SubSection", subSectionSchema);