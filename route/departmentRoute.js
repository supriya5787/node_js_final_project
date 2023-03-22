const express = require("express")
const router = express.Router()
const departmentController = require("../controller/departmentController")
// const verifySignup = require("../middleware/verifySignup")
// const authUser = require("../middleware/authUser")
// const path = require("path")
// const multer = require("multer")


router.get('/department',departmentController.department);
router.get('/department-single',departmentController.departmentsingle);


module.exports = router