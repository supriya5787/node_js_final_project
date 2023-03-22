const express = require("express")
const router = express.Router()
const contactController = require("../controller/contactController")
// const verifySignup = require("../middleware/verifySignup")
// const authUser = require("../middleware/authUser")
// const path = require("path")
// const multer = require("multer")


router.get('/contact',contactController.contact);


module.exports = router