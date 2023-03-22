const express = require("express")
const router = express.Router()
const userController = require("../controller/homeController")
const verifySignup = require("../middleware/verifySignup")
const authUser = require("../middleware/authUser")
const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + 'blog' + path.extname(file.originalname));
    }
})

const maxSize = 2 * 1024 * 1024; // for 1MB

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
    limits: {
        fileSize: maxSize
    }
});




// router.get('/',userController.home);

router.get("/", userController.index)
router.get("/signin", userController.signIn)
router.get("/signup", userController.signUp)
router.post('/appoinment_create',userController.appoinmentcreate);


router.get("/about",[userController.userAuth], userController.about)
router.get('/service',[userController.userAuth],userController.service);
router.get('/department',[userController.userAuth],userController.department);
router.get('/department-single/(:id)',[userController.userAuth],userController.departmentsingle);
router.get('/doctor',[userController.userAuth],userController.doctor);

// router.get("/viewpost/(:doc_slug)", UserController.viewPost);
router.get('/doctor-single/(:doc_slug)',[userController.userAuth],userController.doctorsingle);
// router.get('/doctor-single',[userController.userAuth],userController.doctorsingle);


router.get('/appoinment',[userController.userAuth],userController.appoinment);
router.get("/addpostview",[userController.userAuth], userController.addPostView)
router.post("/addpost",upload.single("image"), userController.addPost)
router.get("/viewpost",[userController.userAuth], userController.viewPost)
router.post("/addcomment", [userController.userAuth], userController.addComment)

router.get('/contact',[userController.userAuth],userController.contact);


router.post("/addUser",[verifySignup.checkDuplicateEntries], userController.addUser)
router.post("/userSignin", userController.userSignin)
router.get("/user/logout", userController.userLogOut)

router.post("/postMessage", [userController.userAuth], userController.postMessage)



module.exports = router


