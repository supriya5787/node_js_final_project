const express = require("express")
const router = express.Router()
const serviceController = require("../controller/serviceController")
// const verifySignup = require("../middleware/verifySignup")
// const authUser = require("../middleware/authUser")
// const path = require("path")
// const multer = require("multer")


router.get('/service',serviceController.service);


module.exports = router