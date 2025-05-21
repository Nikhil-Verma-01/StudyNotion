const category = require("../models/category");


//create Tag handler function

exports.createCategory = async (req, res) => {
    try {
        //fetch data
        const {name, description} = req.body;
        //validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            })
        }

        //create entry in DB
        const categoryDetials = await category.create({
            name: name,
            description: description,
        });
        console.log(categoryDetials);

        //return response
        return res.status(200).json({
            success: true,
            message: "Tag Created Successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//getAlltags handler function

exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await category.find({}, {name: true, description:true});
        res.status(200).json({
            success: true,
            message: "All tags returned successfully",
            allTags,
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: error.message,
        })
    }
}

//category Page Details
exports.categoryPageDetails = async (req, res) => {
    try {
        //get courseId
        const {courseId} = req.body;

        //get courses for specified categoryId
        const selectedCategory = await category.findById(categoryId)
                                        .populate("courses")
                                        .exec();
        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message: "Data not found",
            })
            
        }
        //get courses for different categories
        const differentCategories = await category.find({
                                    _id: {$ne: categoryId},
                                    })
                                    .populate("courses")
                                    .exec();
        //TODO: get top 10 selling courses

        //return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}