const express = require("express")
const router = express.Router()
const aboutController = require("../controller/aboutController")
// const verifySignup = require("../middleware/verifySignup")
// const authUser = require("../middleware/authUser")
// const path = require("path")
// const multer = require("multer")


router.get('/about',aboutController.about);


module.exports = router