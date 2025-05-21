const Profile = require("../models/Profile");
const User = require("../models/User");


exports.updateProfile = async (req, res) => {
    try {
        //get data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;
        //get userId
        const id = req.user.id;
        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        //find Profile
        const userDetials = await User.findById(id);
        const profileId = userDetials.additionalDetails;
        const profileDetials = await Profile.findById(profileId);

        //updateProfile
        profileDetials.dateOfBirth = dateOfBirth;
        profileDetials.about = about;
        profileDetials.gender = gender;
        profileDetials.contactNumber = contactNumber;
        await profileDetials.save();

        //return response
        return res.status(200).json({
            success: true,
            message: 'Profile Updated Successfully',
            profileDetials,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//deleteAccount
//Explore -> how can we schedule this deletion operations
exports.deleteAccount = async (req, res) => {
    try {
        //get Id
        const id = req.user.id;
        //validation
        const updateDetials = await User.findById(id);
        //delete Profile
        await Profile.findbyIdAndDelete({_id: userDetials});
        //TODO:
        //delete User
        await User.findByIdAndDelete({_id: id});
        //return response
        return res.status(200).json({
            success: true,
            message: 'Usee Deleted Successfully',
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'User cannot be deleted successfully'
        })
    }
}


exports.getAllUserDetials = async (req, res) => {
    try {
        //get id
        const id = req.user.id;
        //validation and get user detials
        const userDetials = await User.findById(id).populate("additionalDetials").exec();
        //return response
        return res.status(200).json({
            success: true,
            message: 'User Data fetched Successfully',
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}