const category = require("../models/category");
const Course  = require("../models/Course");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

//createCourse Handler function
exports.createCourse = async (req, res) => {
    try {
        //fetch data
        const {courseName, courseDescriptions, whatYouWillLearn, price, tag} = req.body;
        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescriptions || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetials = await User.findById(userId);
        console.log("Instructor Detials: ", instructorDetials);

        //verifying the userId and instructorDetials 
        if(userId !== instructorDetials){
            return res.status(400).json({
                success: false,
                message: " UserId and intructorDetials are not matching",
            })
        }

        if(!instructorDetials){
            return res.status(404).json({
                success: false,
                message: 'Instructor Detials not found'
            })
        }

        //check given tag is vaild or not
        const categoryDetials  = await category.findById(category);
        if(!categoryDetials){
            return res.status(404).json({
                success: false,
                message: 'Tag Detials not found',
            })
        }

        //Upload Image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, procces.env.FOLDER_NAME);

        //Create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescriptions,
            instructor: instructorDetials._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tagDetials._id,
            thumbnail: thumbnailImage.secure_url,
        })

        //add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetials._id},
            {
                $push:{
                    courses: newCourse._id,
                }
            },
            {new: true},
        )

        //update the TAG ka schema 
        //TODO: Check whether its correct ?
        await category.findByIdAndUpdate(
            {id: categoryDetials._id},
            {
                $push:{
                    courses: newCourse._id
                }
            },
            {new: true},
        )

        return res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: newCourse,
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create Course',
            error: error.message,
        })
    }
}

//getAllCourses hanlder function

exports.getAllCourses = async (req, res) => {
    try {
       //TODO: change the below statement incrementally
       const allCourses = await Course.find({},
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentEnrolled: true,
            }
        )
            .populate("instructor")
            .exec();

        return res.status(200).json({
            success:true,
            message: 'Data for all courses fetched successfully',
            data: allCourses,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Cannot Fetch course data',
            error: error.message,
        })
    }
}

//get Course Details
exports.getCourseDetials = async (req, res) => {
    try {
        //get id
        const {courseId} = req.body;

        //find course detials
        const courseDetials = await Course.find(
                                    {_id: courseId})
                                    .populate(
                                        {path: "instructor",
                                            populate:{
                                                path: "additionalDetails",
                                            },
                                        }
                                    )
                                    .populate("category")
                                    .populate("ratingAndReviews")
                                    .populate({
                                        path:"courseContent",
                                        populate:{
                                            path: "subSection",
                                        },
                                    })
                                    .exec();
        
        //validation
        if(!courseDetials){
            return res.status(400).json({
                success: false,
                message: `Could not find course with ${courseId},`
            })
        }
        //return response
        return res.status(200).json({
            success: true,
            message: "Course Details fetched successfully",
            data: courseDetails,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
