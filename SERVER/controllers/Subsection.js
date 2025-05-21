const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { updateSection } = require("./Section");

exports.createSubSection = async (req, res) => {
    try {
        //data fetch
        const {sectionId, title, timeDuration, descriptions} = req.body;
        //data validation
        if(!sectionId || !title || !timeDuration || !descriptions || !video){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        //upload video to cloudinary
        const uploadDetials = await uploadImageToCloundinary(video, process.env.FOLDER_NAME);
        //Create a sub-section
        const subSectionDetials = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            descritption: descritption,
            videoUrl: uploadDetials.secure_url,
        })
        //update section with this sub section ObjectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                                {$push:{
                                                                    subSection: subSectionDetials._id,
                                                                }},
                                                                {new: true}
                                                            )
        //HW: log updated section here , after adding populate query
        //return response
        return res.status(200).json({
            success: true,
            message: "Sub Section Created Successfully",
            updateSection,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
}

//HW: updateSubSection
exports.updateSubSection = async (req, res) => {
    try {
        const {sectionId, title, descriptions} = req.body;
        //validate
        //update
        //return response
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
}

//HW:deleteSubSection
exports.deleteSubSection = async (req, res) => {
    try {
        //fetch data SubSectionId

        //validate
        //delete 
        //return response
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
}