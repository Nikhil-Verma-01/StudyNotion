const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => { 
    mongoose.connect(process.env.MONGODB_URL,{
        useNewURLParser: true,
        useTopology: true,
    })
    .then(() => console.log("DB Connected Sucessfully"))
    .catch((error) => {
        console.log("DB Connection failed");
        console.error(error);
        process.exit(1);
    })
}