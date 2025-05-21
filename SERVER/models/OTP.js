const mongoose = require("mongoose");
const emailTemplate = require("../mail/templates/courseEnrollmentEmail")
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    otp:{
        type:String,
        required:true,
    },
    expires:{
        type:Date,
        default:Date.now(),
        expires: 5*60,
    },

});

// function -> to send emails
async function sendVerficationsEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification email from StudyNotion",
            emailTemplate(otp));
        console.log("Email sent Successfully", mailResponse);
    } catch (error) {
        console.log("Error occured while sending emails for verification");
        throw error;
    }
}

otpSchema.pre("save", async function(next){
    await sendVerficationsEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", otpSchema);