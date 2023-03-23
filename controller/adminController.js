const Admin = require("../model/user")
const PostModel = require("../model/post")
const CommentModel = require('../model/comment')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.adminAuth = (req, res, next) =>{
    if(req.admin){
        req.flash("message", "Login Successful")
        next()
    }else{
        res.redirect("/admin/signin")
    }
}

exports.adminDashboard = (req, res) => {
    if (req.admin) {
        res.render("./admin/home", {
            message: req.flash("message"),
            data: req.admin,
            title: "Dashboard"
        })
    }
}

// ----------------------------------------

// BANNER
const Banner=require('../model/banner')
const BannerCard=require('../model/bannercard')
const AwardWinningCard = require('../model/awardwinning')
const Testimonial = require('../model/testimonial')

exports.banner = (req, res) => {
    Banner.find().populate("bannercard").then(result => {
       
        BannerCard.find().populate("banner").then(bannerCard => {
            
            AwardWinningCard.find().then(awardWinningCard => {

                Testimonial.find().exec((err,testimonial) => { 

            if (!err) {
                if (result.length > 0) {
                    res.render("./admin/banner", {
                        bannerData: result,
                        title: "Banner",
                        data: req.admin,
                        message: req.flash("message"),
                        bannerCard: bannerCard,
                        awardWinningCard : awardWinningCard,
                        testimonialData:testimonial
                    })
                } else {
                    return req.flash("message", "No Posts Found")
                }
            } else {
                return req.flash("message", "Something Went Wrong")
            }

        }) 
        }) 
        })
        })
}

// BANNER CONTROLLER
exports.addBanner=(req,res)=>{
    res.render('./admin/add_banner',{
        title:"add page",
        message:req.flash('message'),
        data: req.admin,
    })
}

exports.bannercreate=(req,res)=>{
    //console.log(req.body);
   const addBanner= new Banner({
        _id: req.body._id,
        image: req.file.filename,
        title:req.body.title,
        content:req.body.content,
    })
    addBanner.save().then((result)=>{
        console.log(result,"data save");
        req.flash('message',"data added successfully")
        res.redirect('/admin/banner')
    }).catch((err)=>{
        console.log(err,"data not save");
        
    })
}

exports.editBanner=(req,res)=>{
    const id=req.params.id;
    Banner.findById(id).then(std=>{
        res.render('./admin/editBanner',{
            title:"Update Banner",
            bannerdata:std,
            data: req.admin,
        })
    })
    
}

exports.updateBanner=(req,res)=>{
    
   const banner_id=req.body.p_id
   const image=req.file.filename
   const title=req.body.title
   const content=req.body.content

   Banner.findById(banner_id).then((result)=>{
    result.image=image
    result.title=title
    result.content=content
    return result.save().then(results=>{
        res.redirect('/admin/banner')
    }).catch(err=>{
            console.log(err);
    }) 
   })
}

// BANNER CARD CONTROLLER

exports.addBannerCard=(req,res)=>{
    res.render('./admin/add_bannercard',{
        title:"add page",
        message:req.flash('message'),
        data: req.admin,
    })
}

exports.bannercardcreate=(req,res)=>{
   const addBannerCard= new BannerCard({
        _id: req.body._id,
        subtitle_one: req.body.subtitle_one,
        title_one: req.body.title_one,
        description_one: req.body.description_one,

        subtitle_two: req.body.subtitle_two,
        title_two: req.body.title_two,
        description_two: req.body.description_two,

        subtitle_three: req.body.subtitle_three,
        title_three: req.body.title_three,
        day1_three: req.body.day1_three,
        day2_three: req.body.day2_three,
        day3_three: req.body.day3_three,

        time1_three: req.body.time1_three,
        time2_three: req.body.time2_three,
        time3_three: req.body.time3_three,
        
    })
    addBannerCard.save().then((result)=>{
        console.log(result,"data save");
        req.flash('message',"data added successfully")
        res.redirect('/admin/banner')
    }).catch((err)=>{
        console.log(err,"data not save");
        
    })
}

exports.editBannerCard=(req,res)=>{
    const id=req.params.id;
    BannerCard.findById(id).then(std=>{
        res.render('./admin/editBannerCard',{
            title:"Update Banner",
            bannerCardData:std,
            data: req.admin,
        })
    })
    
}

exports.updateBannerCard=(req,res)=>{
    
   const bannercard_id=req.body.bc_id
  
   subtitle_one= req.body.subtitle_one,
   title_one= req.body.title_one,
   description_one=req.body.description_one,

   subtitle_two= req.body.subtitle_two,
   title_two= req.body.title_two,
   description_two=req.body.description_two,

    subtitle_three= req.body.subtitle_three,
    title_three= req.body.title_three,
    day1_three=req.body.day1_three,
    day2_three=req.body.day2_three,
    day3_three=req.body.day3_three,
    time1_three=req.body.time1_three,
    time2_three=req.body.time2_three,
    time3_three=req.body.time3_three,


    BannerCard.findById(bannercard_id).then((result)=>{
    result.subtitle_one = subtitle_one
    result. title_one =  title_one
    result.description_one = description_one

    result.subtitle_two = subtitle_two
    result.title_two =  title_two
    result.description_two = description_two

    result.subtitle_three = subtitle_three
    result.title_three =  title_three
    result.day1_three = day1_three
    result.day2_three = day2_three
    result.day3_three = day3_three
    result.time1_three = time1_three
    result.time2_three = time2_three
    result.time3_three = time3_three

    return result.save().then(results=>{
        res.redirect('/admin/banner')
    }).catch(err=>{
            console.log(err);
    }) 
   })
}

// AWARD WINNING CARDS CONTROLLER

exports.addAwardWinningCard=(req,res)=>{
    res.render('./admin/add_awardwinningcard',{
        title:"add awardwinningcard",
        message:req.flash('message'),
        data: req.admin,
    })
}

exports.awardwinningcardcreate=(req,res)=>{
    //console.log(req.body);
   const addAwardWinningCard= new AwardWinningCard({
        _id: req.body._id,
        award_image: req.file.filename,
        award_title:req.body.award_title,
        award_content:req.body.award_content,
    })
    addAwardWinningCard.save().then((result)=>{
        console.log(result,"data save");
        req.flash('message',"data added successfully")
        res.redirect('/admin/banner')
    }).catch((err)=>{
        console.log(err,"data not save");
        
    })
}

exports.editAwardWinningCard=(req,res)=>{
    const id=req.params.id;
    AwardWinningCard.findById(id).then(std=>{
        res.render('./admin/editAwardWinningCard',{
            title:"Update AwardWinningCard",
            awardWinningData:std,
            data: req.admin,
        })
    })
    
}

exports.updateAwardWinningCard=(req,res)=>{
    
   const ac_id=req.body.ac_id
   const award_image=req.file.filename
   const award_title=req.body.award_title
   const award_content=req.body.award_content

   AwardWinningCard.findById(ac_id).then((result)=>{
    result.award_image=award_image
    result.award_title=award_title
    result.award_content=award_content
    return result.save().then(results=>{
        res.redirect('/admin/banner')
    }).catch(err=>{
            console.log(err);
    }) 
   })
}

// TESTIMONIAL CONTROLLER

exports.addTestimonial=(req,res)=>{
    res.render('./admin/add_testimonal',{
        title:"add page",
        message:req.flash('message'),
        data: req.admin,
    })
}

exports.testimonialcreate=(req,res)=>{
    //console.log(req.body);
   const addtestimonial= new Testimonial({
        _id: req.body._id,
        testimonial_image: req.file.filename,
        testimonial_title:req.body.testimonial_title,
        testimonial_name:req.body.testimonial_name,
        testimonial_content:req.body.testimonial_content,
        
    })
    addtestimonial.save().then((result)=>{
        console.log(result,"data save");
        req.flash('message',"data added successfully")
        res.redirect('/admin/banner')
    }).catch((err)=>{
        console.log(err,"data not save");
        
    })
}

exports.editTestimonial=(req,res)=>{
    const id=req.params.id;
    Testimonial.findById(id).then(std=>{
        res.render('./admin/editTestimonial',{
            title:"Update Banner",
            testimonialdata:std,
            data: req.admin,
        })
    })
    
}

exports.updateTestimonial=(req,res)=>{
    
   const t_id=req.body.t_id
   const testimonial_image=req.file.filename
   const testimonial_title=req.body.testimonial_title
   const testimonial_name=req.body.testimonial_name
   const testimonial_content=req.body.testimonial_content

   Testimonial.findById(t_id).then((result)=>{
    result.testimonial_image = testimonial_image
    result.testimonial_title = testimonial_title
    result.testimonial_name = testimonial_name
    result.testimonial_content = testimonial_content
    return result.save().then(results=>{
        res.redirect('/admin/banner')
    }).catch(err=>{
            console.log(err);
    }) 
   })
}

// ----------------------------------------

exports.adminNews = (req, res) => {
    PostModel.find().populate("user").then(result => {
        console.log(result);
        res.render("./admin/News", {
            title: "Admin | News",
            message: req.flash("message"),
            data: req.admin,
            displayData: result
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.activeNews = (req, res) => {
    PostModel.findByIdAndUpdate(req.params.id, {
        status: true
    }).then(result => {
        console.log("News Activeted...");
        res.redirect("/admin/News");
    }).catch(err => {
        console.log(err);
    })
}

exports.deActiveNews = (req, res) => {
    PostModel.findByIdAndUpdate(req.params.id, {
        status: false
    }).then(result => {
        console.log("News Deactiveted...");
        res.redirect("/admin/News");
    }).catch(err => {
        console.log(err);
    })
}

exports.comments = (req, res) => {
    CommentModel.find().populate("post").then(result => {
        res.render("admin/Comments", {
            title: "Admin | Comments",
            data: req.admin,
            displayData: result,
            message: req.flash("message"),
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.activeComment = (req, res) => {
    CommentModel.findByIdAndUpdate(req.params.id, {
        status: true
    }).then(result => {
        console.log("Comment Activeted...");
        res.redirect("/admin/comments");
    }).catch(err => {
        console.log(err);
    })
}

exports.deActiveComment = (req, res) => {
    CommentModel.findByIdAndUpdate(req.params.id, {
        status: false
    }).then(result => {
        console.log("Comment Deactiveted...");
        res.redirect("/admin/comments");
    }).catch(err => {
        console.log(err);
    })
}

//User

exports.users = (req, res) => {
    Admin.find().then(result => {
        res.render("admin/Users", {
            title: "Admin | Users",
            data: req.admin,
            displayData: result,
            message: req.flash("message"),
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.activeUser = (req, res) => {
    Admin.findByIdAndUpdate(req.params.id, {
        status: true
    }).then(result => {
        console.log("User Activeted...");
        res.redirect("/admin/users");
    }).catch(err => {
        console.log(err);
    })
}

exports.deActiveUser = (req, res) => {
    Admin.findByIdAndUpdate(req.params.id, {
        status: false
    }).then(result => {
        console.log("User Deactiveted...");
        res.redirect("/admin/users");
    }).catch(err => {
        console.log(err);
    })
}

exports.editUser=(req,res)=>{
    const id=req.params.id;
    Admin.findById(id).then(user=>{
        res.render('./admin/editUser',{
            title:"Update Department",
            userData:user,
            data: req.admin,
        })
    })
    
}

exports.updateUser=(req,res)=>{
    const user_id=req.body.user_id
    const name=req.body.name
    const email=req.body.email
    const phone=req.body.phone
    Admin.findById(user_id).then((result)=>{
     result.name = name
     result.email = email
     result.phone=phone
     return result.save().then(results=>{
         res.redirect('/admin/Users')
     }).catch(err=>{
             console.log(err);
     }) 
    })
}

// DEPARTMENT
const Department = require('../model/department');
const Doctor = require('../model/doctor');


exports.adminDepartment = (req, res) => {
    if (req.admin) {
        Department.find().then(deptData => 
        {
            res.render("./admin/department", {
            message: req.flash("message"),
            data: req.admin,
            departmentData : deptData,
            title: "Department"   
            })
        }
    )}
}

// DEPARTMENT CONTROLLER

exports.addDepartment=(req,res)=>{
    res.render('./admin/add_department',{
        title:"add page",
        message:req.flash('message'),
        data: req.admin,
    })
}

exports.departmentcreate=(req,res)=>{
   const addDepartment= new Department({
        _id: req.body._id,
        dept_image: req.file.filename,
        dept_name:req.body.dept_name,
        dept_description:req.body.dept_description,
        dept_mh:req.body.dept_mh,
        dept_sf:req.body.dept_sf,
    })
    addDepartment.save().then((result)=>{
        console.log(result,"data save");
        req.flash('message',"data added successfully")
        res.redirect('/admin/department')
    }).catch((err)=>{
        console.log(err,"data not save");
        
    })
}

exports.editDepartment=(req,res)=>{
    const id=req.params.id;
    Department.findById(id).then(std=>{
        res.render('./admin/editDepartment',{
            title:"Update Department",
            departmentdata:std,
            data: req.admin,
        })
    })
    
}

exports.updateDepartment=(req,res)=>{
     // dept_image,dept_name,dept_description,dept_mh,dept_sf
   const department_id=req.body.d_id
   const dept_image=req.file.filename
   const dept_name=req.body.dept_name
   const dept_description=req.body.dept_description
   const dept_mh=req.body.dept_mh
   const dept_sf=req.body.dept_sf

   Department.findById(department_id).then((result)=>{
    result.dept_image=dept_image
    result.dept_name=dept_name
    result.dept_description=dept_description
    result.dept_mh=dept_mh
    result.dept_sf=dept_sf

    return result.save().then(results=>{
        res.redirect('/admin/department')
    }).catch(err=>{
            console.log(err);
    }) 
   })
}

// DOCTORS

exports.adminDoctors = (req, res) => {
    if (req.admin) {
        Doctor.find().then(docData => 
        {
            res.render("./admin/doctors", {
            message: req.flash("message"),
            data: req.admin,
            doctorData :docData,
            title: "Doctor"
            })
        }
    )}
}

exports.addDoctor=(req,res)=>{
    res.render('./admin/add_doctor',{
        title:"add page",
        message:req.flash('message'),
        data: req.admin,
    })
}

exports.activeDoctor = (req, res) => {
    Doctor.findByIdAndUpdate(req.params.id, {
        status: true
    }).then(result => {
        console.log("User Activeted...");
        res.redirect("/admin/doctors");
    }).catch(err => {
        console.log(err);
    })
}

exports.deActiveDoctor = (req, res) => {
    Doctor.findByIdAndUpdate(req.params.id, {
        status: false
    }).then(result => {
        console.log("User Deactiveted...");
        res.redirect("/admin/doctors");
    }).catch(err => {
        console.log(err);
    })
}

exports.doctorcreate=(req,res)=>{
    Doctor.findOne({
        doc_slug: req.body.doc_name.trim().replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_').toLowerCase()
    }).exec((err, data) => {
        if (data) {
            req.flash("message", "Doctor Name Already Exists");
            req.flash("alert", "error-msg");
            console.log("Doctor Name Already Exists", err);
            res.redirect("/admin/doctors");
        } else {
            const addDoctor= new Doctor({
                _id: req.body._id,
                doc_image: req.file.filename,
                doc_name:req.body.doc_name,
                doc_dept:req.body.doc_dept,
                doc_slug:req.body.doc_name.trim().replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "_").toLowerCase(),
                doc_intro:req.body.doc_intro,
                doc_description:req.body.doc_description,
                doc_specialization:req.body. doc_specialization,
                doc_q1:req.body.doc_q1,
                doc_q2:req.body.doc_q2,
                doc_q3:req.body.doc_q3,
                doc_q4:req.body.doc_q4,
            })
            addDoctor.save().then((result)=>{
                console.log(result,"data save");
                req.flash('message',"data added successfully")
                res.redirect('/admin/doctors')
            }).catch((err)=>{
                console.log(err,"data not save");
                
            })

        }

    })
}

exports.editDoctor=(req,res)=>{
    const id=req.params.id;
    Doctor.findById(id).then(std=>{
        res.render('./admin/editDoctor',{
            title:"Update Doctor",
            doctordata:std,
            data: req.admin,
        })
    })
    
}

exports.updateDoctor=(req,res)=>{
    //  doc_image,doc_name,doc_dept,doc_slug,doc_intro,doc_description,doc_q1,doc_q2,doc_q3,doc_q4
   const doctor_id=req.body.dr_id
   const doc_image=req.file.filename
   const doc_name=req.body.doc_name
   const doc_dept=req.body.doc_dept
   const doc_slug=req.body.doc_name.trim().replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "_").toLowerCase()
   const doc_intro=req.body.doc_intro
   const doc_description =req.body.doc_description
   const  doc_specialization= req.body. doc_specialization
   const doc_q1=req.body.doc_q1
   const doc_q2=req.body.doc_q2
   const doc_q3=req.body.doc_q3
   const doc_q4=req.body.doc_q4

   Doctor.findById(doctor_id).then((result)=>{
    result.doc_image = doc_image
    result.doc_name = doc_name
    result.doc_dept = doc_dept
    result.doc_slug = doc_slug
    result.doc_intro = doc_intro
    result.doc_description=doc_description
    result. doc_specialization= doc_specialization
    result.doc_q1=doc_q1
    result.doc_q2=doc_q2
    result.doc_q3=doc_q3
    result.doc_q4=doc_q4

    return result.save().then(results=>{
        res.redirect('/admin/doctors')
    }).catch(err=>{
            console.log(err);
    }) 
   })
}

//Service

const service = require('../model/service')
exports.adminService = (req, res) => {
    if (req.admin) {
        service.find().then(servData => 
        {
            res.render("./admin/service", {
            message: req.flash("message"),
            data: req.admin,
            serviceData :servData,
            title: "Admin | Service"
            })
        }
    )}
}

exports.addService=(req,res)=>{
    res.render('./admin/add_service',{
        title:"add service page",
        message:req.flash('message'),
        data: req.admin,
    })
}

exports.activeService = (req, res) => {
    service.findByIdAndUpdate(req.params.id, {
        status: true
    }).then(result => {
        console.log("Service Activeted...");
        res.redirect("/admin/service");
    }).catch(err => {
        console.log(err);
    })
}

exports.deactiveService = (req, res) => {
    service.findByIdAndUpdate(req.params.id, {
        status: false
    }).then(result => {
        console.log("User Deactiveted...");
        res.redirect("/admin/service");
    }).catch(err => {
        console.log(err);
    })
}

exports.serviceCreate=(req,res)=>{
        const addService= new service({
                image: req.file.filename,
                name:req.body.name,
                description:req.body.description
            })
            addService.save().then((result)=>{
                console.log(result,"data save");
                req.flash('message',"data added successfully")
                res.redirect('/admin/service')
            }).catch((err)=>{
                console.log(err,"data not save");
            })
}

exports.editService=(req,res)=>{
    const id=req.params.id;
    service.findById(id).then(serv=>{
        res.render('./admin/editService',{
            title:"Update Service",
            serviceData:serv,
            data: req.admin,
        })
    })
    
}

exports.updateService=(req,res)=>{
   const service_id=req.body.serv_id
   const serv_image=req.file.filename
   const serv_name=req.body.name
   const serv_description =req.body.description
   service.findById(service_id).then((result)=>{
    result.image = serv_image
    result.name = serv_name
    result.description=serv_description
    return result.save().then(results=>{
        res.redirect('/admin/service')
    }).catch(err=>{
            console.log(err);
    }) 
   })
}

//Contact
const contact=require("../model/contact")
exports.adminContact = (req, res) => {
    if (req.admin) {
        contact.find().then(conData => 
        {
            res.render("./admin/contact", {
            message: req.flash("message"),
            data: req.admin,
            contactData :conData,
            title: "Admin | Contact"
            })
        }
    )}
}

exports.addContact=(req,res)=>{
    res.render('./admin/add_contact',{
        title:"add contact page",
        message:req.flash('message'),
        data: req.admin,
    })
}

exports.activeContact = (req, res) => {
    contact.findByIdAndUpdate(req.params.id, {
        status: true
    }).then(result => {
        console.log("Contact Activeted...");
        res.redirect("/admin/contact");
    }).catch(err => {
        console.log(err);
    })
}

exports.deactiveContact = (req, res) => {
    contact.findByIdAndUpdate(req.params.id, {
        status: false
    }).then(result => {
        console.log("User Deactiveted...");
        res.redirect("/admin/contact");
    }).catch(err => {
        console.log(err);
    })
}

exports.contactCreate=(req,res)=>{
        const addContact= new contact({
                icon_class: req.body.icon_class,
                title:req.body.title,
                description:req.body.description
            })
            addContact.save().then((result)=>{
                console.log(result,"data save");
                req.flash('message',"data added successfully")
                res.redirect('/admin/contact')
            }).catch((err)=>{
                console.log(err,"data not save");
            })
}

exports.editContact=(req,res)=>{
    const id=req.params.id;
    contact.findById(id).then(cont=>{
        res.render('./admin/editContact',{
            title:"Update Contact",
            contactData:cont,
            data: req.admin,
        })
    })
    
}

exports.updateContact=(req,res)=>{
   const contact_id=req.body.cont_id
   const iconclass=req.body.icon_class
   const title=req.body.title
   const description =req.body.description
   contact.findById(contact_id).then((result)=>{
    result.icon_class = iconclass
    result.title = title
    result.description=description
    return result.save().then(results=>{
        res.redirect('/admin/contact')
    }).catch(err=>{
            console.log(err);
    }) 
   })
}

// APPOINMENTS
const Appoinment = require("../model/appoinment");
exports.adminAppoinments = (req, res) => {
    if (req.admin) {

        Appoinment.find().then(appData => 
        {
            res.render("./admin/appoinments", {
            message: req.flash("message"),
            data: req.admin,
            appData :appData,
            title: "Doctor"
            })
        }
    )}
}

exports.activeAppoinment = (req, res) => {
    Appoinment.findByIdAndUpdate(req.params.id, {
        status: true
    }).then(result => {
        console.log("User Activeted...");
        res.redirect("/admin/appoinment");
    }).catch(err => {
        console.log(err);
    })
}

exports.deActiveAppoinment = (req, res) => {
    Appoinment.findByIdAndUpdate(req.params.id, {
        status: false
    }).then(result => {
        console.log("User Deactiveted...");
        res.redirect("/admin/appoinment");
    }).catch(err => {
        console.log(err);
    })
}

exports.adminAction = (req, res) => {
    if (req.admin) {
        res.render("./admin/News", {
            message: req.flash("message"),
            data: req.admin,
            title: "Actions"
        })
    }
}

exports.adminAbout = (req, res) => {
    if (req.admin) {
        res.render("./admin/News", {
            message: req.flash("message"),
            data: req.admin,
            title: "About"
        })
    }
}

exports.signin = (req, res) => {
    // if (req.user) {
        res.render("./admin/admin-signin", {
            message: req.flash("message"),
            // data: req.user
        })
    // }
}

// exports.addAdmin = (req, res) => {
exports.addAdmin = async (req, res) => {
    try {
    const { name, email, password } = req.body;
    await Admin({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    }).save((err, admin) => {
        if (!err) {
            // req.flash("message", "Admin Details Added Successfully. Please Login to Continue.")
            // res.redirect("/signin")
            res.status(201).json({ success: true, msg: 'Admin Added Successfully', data: admin })
        } else {
            res.status(404).json({ success: false, msg: 'Admin Add Unsuccessful', data: err })
            // console.log("User Not Added...", err)
        }
    });
        // res.status(201).json({ success: true, msg: 'Admin Added Successfully', data: admin })
    } catch (exc) {
        res.status(500).json({ success: false, msg: 'Error', data: exc })
    }
}

exports.adminSignin = (req, res) => {
    // console.log(req.body);
    if (req.body.email && req.body.password) {
        Admin.findOne({
            email: req.body.email
        }, (err, admin) => {
            // console.log(admin.role);
            if (admin !== null && admin.role === "Admin") {
                if (bcrypt.compareSync(req.body.password, admin.password)) {
                    const token = jwt.sign({
                        id: admin._id,
                        name: admin.name,
                        email: admin.email,
                        phone: admin.phone
                    }, "shilpaAdmin597", { expiresIn: "50m" });
                    res.cookie("adminToken", token);
                    res.redirect("/admin/dashboard")
                } else {
                    req.flash("message", "Invalid Password");
                    res.redirect("/admin/signin");
                }
            } else {
                req.flash("message", "Invalid Email");
                res.redirect("/admin/signin");
            }
        })
    } else {
        req.flash("message", "Email & Password is Required!!");
        res.redirect("/admin/signin");
    }
}

exports.adminLogOut = (req, res) => {
    res.clearCookie("adminToken")
    res.redirect("/admin/signin")
}