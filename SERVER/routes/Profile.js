const express = require("express")
const router = express.Router()
const {auth} = require("../middlewares/auth")
const {
    deleteAccount,
    updateProfile, 
    getAllUserDetials,
    updateDisplayPicture,
    getEnrolledCourse,
} = require("../controllers/Profile")

//*******************************************************************************
//                          Profile Routes
// ******************************************************************************
//! Delete User Account
router.delete("/deleteProfile", deleteAccount)
//? Update Profile
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetials", auth, getAllUserDetials)

//Get Enrolled Course
router.get("/getEnrolledCourse", auth, getEnrolledCourse)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router