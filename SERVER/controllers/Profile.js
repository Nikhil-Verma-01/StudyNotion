const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
// Method for updating a profile
exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
		const id = req.user.id;

		// Find the user
		const userDetails = await User.findById(id);
		
		if (!userDetails) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		let profile;
		
		// Check if profile exists
		if (userDetails.additionalDetails) {
			profile = await Profile.findById(userDetails.additionalDetails);
		}
		
		// If profile doesn't exist, create one
		if (!profile) {
			console.log("Profile not found, creating new profile...");
			
			profile = await Profile.create({
				gender: gender || null,
				dateOfBirth: dateOfBirth || null,
				about: about || null,
				contactNumber: contactNumber || null,
			});
			
			// Link the profile to the user
			userDetails.additionalDetails = profile._id;
			await userDetails.save();
			
			console.log("New profile created and linked to user");
		} else {
			// Update existing profile
			if (gender !== undefined) profile.gender = gender;
			if (dateOfBirth) profile.dateOfBirth = dateOfBirth;
			if (about) profile.about = about;
			if (contactNumber) profile.contactNumber = contactNumber;
			
			await profile.save();
		}

		// Get updated user details with populated profile
		const updatedUserDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			data: updatedUserDetails,
		});
	} catch (error) {
		console.log("Error in updateProfile:", error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.deleteAccount = async (req, res) => {
	try {
		// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
		console.log("Printing ID: ", req.user.id);
		const id = req.user.id;
		
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		// TODO: Unenroll User From All the Enrolled Courses
		// Now Delete User
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};