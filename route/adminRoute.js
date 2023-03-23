const express = require("express")
const adminController = require("../controller/adminController")
const verifySignup = require("../middleware/verifySignup")
const path = require("path")
const multer = require("multer")

// Setup file storage

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

const router = express.Router()

router.get("/signin", adminController.signin)
router.get("/dashboard", adminController.adminAuth, adminController.adminDashboard)
router.get("/banner", adminController.adminAuth, adminController.banner)


// ------------------------HOME--------------------------------------------
// BANNER ROUTES
router.get('/add_banner',adminController.addBanner);
router.post('/banner_create',upload.single("image"),adminController.bannercreate);
router.get('/editBanner/:id',adminController.editBanner);
router.post('/updateBanner',upload.single("image"),adminController.updateBanner);

// BANNER CARDS ROUTES
router.get('/add_bannercard',adminController.addBannerCard);
router.post('/bannercard_create',adminController.bannercardcreate);
router.get('/editBannerCard/:id',adminController.editBannerCard);
router.post('/updateBannerCard',adminController.updateBannerCard);


// AWARD WINNING CARDS ROUTES
router.get('/add_awardwinningcard',adminController.addAwardWinningCard);
router.post('/awardwinningcard_create',upload.single("award_image"),adminController.awardwinningcardcreate);
router.get('/editAwardWinningCard/:id',adminController.editAwardWinningCard);
router.post('/updateAwardWinningCard',upload.single("award_image"),adminController.updateAwardWinningCard);

// TESTIMONIAL ROUTES
router.get('/add_testimonial',adminController.addTestimonial);
router.post('/testimonial_create',upload.single("testimonial_image"),adminController.testimonialcreate);
router.get('/editTestimonial/:id',adminController.editTestimonial);
router.post('/updateTestimonial',upload.single("testimonial_image"),adminController.updateTestimonial);


// DEPARTMENT ROUTES
router.get("/department", adminController.adminAuth, adminController.adminDepartment)
router.get('/add_department',adminController.addDepartment);
router.post('/department_create',upload.single("dept_image"),adminController.departmentcreate);
router.get('/editDepartment/:id',adminController.editDepartment);
router.post('/updateDepartment',upload.single("dept_image"),adminController.updateDepartment);


// DOCTORS ROUTES
router.get("/doctors", adminController.adminAuth, adminController.adminDoctors)
router.get('/add_doctor',adminController.addDoctor);
router.post('/doctor_create',upload.single("doc_image"),adminController.doctorcreate);
router.get('/editDoctor/:id',adminController.editDoctor);
router.post('/updateDoctor',upload.single("doc_image"),adminController.updateDoctor);
router.get("/activedoctor/(:id)", adminController.adminAuth, adminController.activeDoctor);
router.get("/deactivedoctor/(:id)", adminController.adminAuth, adminController.deActiveDoctor);

//Service Routes
router.get("/service", adminController.adminAuth, adminController.adminService)
router.get('/add_service',adminController.addService);
router.post('/service_create',upload.single("image"),adminController.serviceCreate);
router.get('/editService/:id',adminController.editService);
router.post('/updateService',upload.single("image"),adminController.updateService);
router.get("/activeService/(:id)", adminController.adminAuth, adminController.activeService);
router.get("/deactiveService/(:id)", adminController.adminAuth, adminController.deactiveService);

//Contact Routes
router.get("/contact", adminController.adminAuth, adminController.adminContact)
router.get('/add_contact',adminController.addContact);
router.post('/contact_create',adminController.contactCreate);
router.get('/editContact/:id',adminController.editContact);
router.post('/updateContact',adminController.updateContact);
router.get("/activeContact/(:id)", adminController.adminAuth, adminController.activeContact);
router.get("/deactiveContact/(:id)", adminController.adminAuth, adminController.deactiveContact);


// APPOINMENT ROUTES
router.get("/appoinment", adminController.adminAuth, adminController.adminAppoinments);
router.get("/activeapp/(:id)", adminController.adminAuth, adminController.activeAppoinment);
router.get("/deactiveapp/(:id)", adminController.adminAuth, adminController.deActiveAppoinment);



router.get("/news", adminController.adminAuth, adminController.adminNews)
router.get("/activepost/(:id)",adminController.adminAuth, adminController.activeNews);
router.get("/deactivepost/(:id)", adminController.adminAuth, adminController.deActiveNews);


router.get("/comments", adminController.adminAuth, adminController.comments)
router.get("/activecomment/(:id)", adminController.adminAuth, adminController.activeComment);
router.get("/deactivecomment/(:id)", adminController.adminAuth, adminController.deActiveComment);



router.get("/users", adminController.adminAuth, adminController.users)
router.get("/activeuser/(:id)", adminController.adminAuth, adminController.activeUser);
router.get("/deactiveuser/(:id)", adminController.adminAuth, adminController.deActiveUser);
router.get("/editUser/(:id)", adminController.adminAuth, adminController.editUser);
router.post('/updateUser',adminController.updateUser);



router.get("/action", adminController.adminAuth, adminController.adminAction)
router.get("/about", adminController.adminAuth, adminController.adminAbout)
// router.post("/addAdmin",[verifySignup.checkDuplicateEntries], adminController.addAdmin)
router.post("/addAdmin", adminController.addAdmin)
router.post("/adminSignin", adminController.adminSignin)
router.get("/logout", adminController.adminLogOut)

module.exports = router