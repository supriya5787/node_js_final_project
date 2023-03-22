const express = require("express")
const router = express.Router()
const doctorController = require("../controller/doctorController")
// const verifySignup = require("../middleware/verifySignup")
// const authUser = require("../middleware/authUser")
// const path = require("path")
// const multer = require("multer")


router.get('/doctor',doctorController.doctor);
router.get('/doctor-single',doctorController.doctorsingle);
router.get('/appoinment',doctorController.appoinment);


module.exports = router