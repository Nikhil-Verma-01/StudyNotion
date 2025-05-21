//import all the required modules
const express = require("express")
const router = express.Router()

const {capturePayment, verfiySignature} = require("../controllers/Payments")
const {auth, isStudent} = require("../middlewares/auth")

router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", verfiySignature)

module.exports = router