const {instance} = require("../models/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mails/templates/courseEnrollmentEmail");
const {default: mongoose} = require("mongoose");


//capture the payment and initiate the Razorpay order
exports.capturePayment = async(req, res) => {
    //get courseId and UserID
    const {course_id} = req.body;
    const userId = req.user.id;
    //validation
    if(!userId){
        return res.json({
            success: false,
            message: 'User is not exist, Please get yourself Resigtered',
        })
    }
    //valid courseID
    if(!course_id){
        return res.json({
            success: false,
            message: 'Please provide valid course ID'
        })
    };
    //valid courseDetial
    let course;
    try {
        const course = await Course.findById(course_id);
        if(!course){
            return res.json({
                success: false,
                message: 'Please provide valid course ID'
            })
        }
        //user aldready pay the same course
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentEnrolled.includes(uid)) {
            return res.status(200).json({
                success: false,
                message: 'Student is aldreay enrolled',
            })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

    //! All Below Code given on Razorpay API site
    //order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId: course_id,
            userId
        }
    };

    try {
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        //return response
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Could not initiate the order"
        })
    }
        
}

//verify Signature of Razorpay and Server

exports.verifySignature = async (req, res) => {
    const webhooksecret = "12345678";

    const signature = req.headers['x-razorpay-signature'];

    const shasum = crypto.createHmac("sha256", webhooksecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment is Authorised");

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try {
            //fulfill the action
            //find the couse and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push: {studentEnrolled: userId}},
                {new: true},
            )

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message: "Course could not found"
                })
            }
            console.log(enrolledCourse);

            //find the student and add the course to their list enrolled courses
            const enrolledStudent = await user.findOneAndUpdate(
                {_id: userId},
                {$push: {course: courseId}},
                {new: true},
            )
            console.log(enrolledStudent);

            //send confimation mail to student
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulations from StudyNotion",
                "Congratulations, you are onboarded into new Codehelp Course",
            )
            console.log(emailResponse);
            return res.status(200).json({
                success: false,
                message: "Signature verified and Course Added"
            });


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }
    else{
        return res.status(400).json({
            success: false,
            message: 'Invalid request',
        })
    }
    
}