const User =  require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
const mailSender = require("../utils/mailSender");
const {passwordUpdate} = require("../mail/[templates]/passwordUpdate")
require("dotenv").config();


//send OTP
exports.sendOTP = async (req, res) => {
    
    try {
       //fetch email from request's body
        const {email} = req.body;

        //Check is User exist before?
        const checkUserPresent = await User.findOne({email});

        //if user exist, the return a response
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message: "User is aldready existed",
            })
        }
        
        //**This Code form line 22-41 is bad code , because we don't run a loop on db. To overcome the OTP duplication issue we use some good pacakage which a unique otp every time 
        //Generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars: false,
        });
        console.log("Otp generated as: ", otp);
        //check unique otp ?
        const result = await OTP.findOne({otp: otp});

        while(result){
            otp = otpGenerator(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars: false,
            });
            result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email, otp};

        //cerat an entry for otp
        const otpBody  = await OTP.create(otpPayload);
        console.log(otpBody);

        //return response successful
        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message: error.message, 
        })
    }
    
}

//sign up
exports.signUp = async (req, res) => {
    try {
        //data fetch from request's body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;
        //validate the data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message: "All fields are required",
            })
        }
        //matches the password 
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and ConfirmPassword are not matching, please try again"
            })
        }
        //check is already exist or not 
        const existingUser = await User.find({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            })
        }

        //find most recent OTP from database
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("Recent OTP: ", recentOTP);
        //validate OTP
        if(recentOTP.length === 0){
            return res.status(400).json({
                success: false,
                message:"OTP not found"
            })
        }
        else if(otp !== recentOTP.otp){
            //Invalid OTP
            return res.status(400).json({
                success:false,
                message: "Invalid OTP",
            })
        }

        //Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        //Create the user
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);

        //create password entry 
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth: null,
            about: null,
            contactNumber:null,
        });
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        //return res[]
        return res.status(200).json({
            success:true,
            message:"Entry created successfully",
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            messaage:"User cannot be registered . Please try again"
        })
    }
    
}

//Login in
exports.Login = async (req, res) => {
    try {
        //get data from request's body
        const {email, password} = req.body;
        //validate data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message: 'All fields are required, please try Again'
            });
        }
        //user check exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success: false,
                message:"User is not exist",
            })
        }
        //generate JWT , after password matching
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token, 
                user,
                message: "Logged in Succesfully",
            })

        }
        else{
            return res.status(401).json({
                success:false,
                message: "Password is incorrect"
            })
        }

        

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login failure , please try again",
        });
    }
}

//Change Password
exports.changePassword = async (req,res) => {
    try {
        //get data from request's body
        const userDetails = await User.findById(req.user.id);
    
        //get oldPassword, newPasword, confirmPassword
        const {oldPassword, newPassword, confirmNewPassword} = req.body;
    
        //validation
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );
        if(!isPasswordMatch){
            //If old password does not match, return a 401 (Unathorized) error
            return res.status(401).json({
                success: false,
                message: "The password is incorrect",
            });
        }

        //Match new password and confirm new password
        if(newPassword !== confirmNewPassword){
            //If new password and confirm new password
            return res.status(400).json({
                success: false,
                message: "The password and confirm password"
            })
        }
            
        //update pwd in DB 
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            {password: encryptedPassword},
            {new: true}
        )
        //send mail - Password Updated
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                passwordUpdate(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails}`
                )
            );
            console.log("Email sent successfully:", emailResponse.response);
        } catch (error) {
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.messaage,
            });
        }
        //return response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });
        
    } catch (error) {
        //If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.messaage,
        });
    }
}