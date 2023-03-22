const express = require("express")
const router = express.Router()
const blogController = require("../controller/blogController")
// const verifySignup = require("../middleware/verifySignup")
// const authUser = require("../middleware/authUser")
// const path = require("path")
// const multer = require("multer")


router.get('/blog-sidebar',blogController.blogsidebar);
router.get('/blog-single',blogController.blogsingle);


module.exports = router