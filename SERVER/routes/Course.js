//Import the required modules
const express = require("express")
const router = express.Router()

//Import the Controllers
//Course Controllers
const{
    createCourse,
    getAllCourse,
    getCourseDetials,
} = require("../controllers/Course")

//Categories Controllers
const{
    showAllCategories,
    createCategory,
    categoryPageDetails,
} = require("../controllers/Category")

//Section Controllers
const{
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section")

//Sub-Section Controllers
const{
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/Subsection")

//Rating Controllers
const{
    createRating,
    getAverageRating,
    getAllRating,
} = require("../controllers/RatingAndReview")

//Importing Middlewares
const {auth, isInstructor, isStudent, isAdmin} = require("../middlewares/auth")

//*************************************************************************
//                          Course Routes
//*************************************************************************

//Course can Only be created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to Course
router.post("/addSection", auth, isInstructor, createSection)
//Update a Section
router.post("/deleteSection", auth, isInstructor, updateSection)
//Delete a Section
router.post("/updateSection", auth, isInstructor, deleteSection)
///Edit the Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
//Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
//Add a Sub Section to a section
router.post("/addSubSection", auth, isInstructor, createSubSection)
//Get all Registered Course
router.get("/getAllCourse", getAllCourse)
//Get Details for a specific Courses
router.post("/getCourseDetails", getCourseDetials)


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingReview)

module.exports = router