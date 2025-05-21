const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res) => {
    try {
        //extact token
        const token = req.cookies.token || req.body.token || re.header("Authorisation").replace("Bearer", "");
        //token is missing 
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }

        //verify the token
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (error) {
            //verfication-issue
            return res.status(401).json({
                success: false,
                message:"Token is invalid"
            })
        }

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Somethinf went wrong while validating the token",

        })
    }
}

//isStudent
exports.isStudent = async (req, res) => {
    try {
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Students",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please Try Again"
        })
    }
}

//isInsturctor
exports.isInsturctor = async (req, res) => {
    try {
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Instructor, please try again"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please Try Again"
        })
    }
}

//isAdmin
exports.isAdmin = async (req, res) => {
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin, please try again"
            })
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please Try Again"
        })
    }
}