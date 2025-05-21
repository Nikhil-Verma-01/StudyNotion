const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//reset passwordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from req body
        const email = req.body.email;
        //check user for this email, email validation
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Your Email is not registered with us"
            })
        }
        //generate token
        const token = crypto.randomUUID();
        
        //update user by adding token and expiration time
        const updateDetials = await User.findByIdAndUpdate(
                                        {email: email},
                                        {
                                            token: token,
                                            resetPasswordExpires: Date.now() + 5*60*1000,
                                        },
                                        {new:true}
                                    );
        //create url
        const url = `http://localhost:3000/update-password/${token}`
        //send mail conatining the url
        await mailSender(email,
                        "Password Reset Link",
                        `Password Reset Link: ${url}`);
                    
        //return response
        return res.json({
            success:true,
            message: "Email sent successfully, please check email and change password"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending for resetPassword"
        })
    }
}

//reset Password
exports.resetPassword = async (req, res) => {
    try {
        //data fetch
        const {password, confirmPassword, token} = req.body;
        //validation
        if(password !== confirmPassword){
            return res.json({
                success: false,
                message:"Password not matching"
            })
        }
        //get userdetials from db using token
        const userDetials = await User.findOne({token: token});
        //if No entry - invalid token
        if(!userDetials){
            return res.json({
                success: false,
                message:"Token is invalid"
            })
        }
        //token time check
        if( userDetials.resetPasswordExpires < Date.now()){
            return res.json({
                success: false,
                message: "Token is expired, please regenerated your token"
            })
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //password update
        await User.findOneAndUpdate(
            {token: token},
            {password: password},
            {new: true},
        );
        //return response
        return res.status(200).json({
            success: true,
            message:'Password reset successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending for resetPassword"
        })
    }
}