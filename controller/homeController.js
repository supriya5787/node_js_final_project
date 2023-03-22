const User = require("../model/user")
const Banner=require('../model/banner')
const BannerCard=require('../model/bannercard')
const AwardWinningCard = require('../model/awardwinning')
const TestimonialCard = require('../model/testimonial')
const Department = require('../model/department');
const Doctor = require('../model/doctor');
const Post = require("../model/post")
const Comment = require("../model/comment")
const Service = require("../model/service")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.userAuth = (req, res, next) => {
    if (req.user) {
        // console.log("1>userauth", req.user);
        req.flash("message", "Login Successful")
        next()
    } else {
        res.redirect("/signin")
    }
}

exports.addUser = (req, res) => {
    const { name, email,phone, password } = req.body;
    User({
        name: name,
        email: email,
        phone: phone,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    }).save((err, user) => {
        if (!err) {
            req.flash("message", "User Added Successfully. Please Login to Continue.")
            res.redirect("/signin")
        } else {
            console.log("User Not Added...", err)
        }
    })
    // res.status(201).json({ success: true, msg: 'User Added Successfully', data: user })
    // } catch (exc) {
    // res.status(500).json({ success: false, msg: 'User Add Unsuccessful', data: exc })
    // }
}

exports.userSignin = (req, res) => {
    if (req.body.email && req.body.password) {
        User.findOne({
            email: req.body.email
        }, (err, user) => {
            // console.log(user);
            if (user.status && user.role === "Basic") {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone
                    }, "shilpaAdmin597", { expiresIn: "50m" });
                    res.cookie("userToken", token);
                    if (req.body.rememberme) {
                        res.cookie("email", req.body.email)
                        res.cookie("password", req.body.password)
                    }
                    res.redirect("/")
                } else {
                    req.flash("message", "Invalid Password");
                    res.redirect("/signin");
                }
            } else {
                req.flash("message", "Invalid Email");
                res.redirect("/signin");
            }
        })
    } else {
        req.flash("message", "Email & Password is Required!!");
        res.redirect("/signin");
    }
}

exports.userLogOut = (req, res) => {
    res.clearCookie("userToken")
    res.redirect("/")
}

exports.signIn = (req, res) => {
    const loginData = {}
    loginData.email = req.cookies.email ? req.cookies.email : undefined;
    loginData.password = req.cookies.password ? req.cookies.password : undefined;
    res.render("signin", {
        message: req.flash("message"),
        data: loginData,
        
    })
}

exports.signUp = (req, res) => {
    res.render("signup", {
        message: req.flash("message"),
    })
}

// ---------------------------------------------------------------------------------

exports.index = (req, res) => {
    Banner.find().then(result => {
        BannerCard.find().then(bannerCard => {
            AwardWinningCard.find().then(awardWinningCard => {
                TestimonialCard.find().then(testimonialCard => {
                    Doctor.find().populate("doc_dept").then(doctorData  => {
                        Appoinment.find().exec((err,appData)  => {
        if(!err){
            res.render("index", {
            title: "User | Banner",
            message: req.flash("message"),
            data: req.user,
            bannerData: result,
            bannerCard: bannerCard, 
            awardWinningCard : awardWinningCard,
            testimonialCard: testimonialCard,
            doctorData:doctorData,
            appData:appData
            })
        }
    })
    })   
    })
    })
    })

}).catch(err => {
        console.log(err);
    })
}

const Appoinment = require('../model/appoinment')
exports.appoinmentcreate=(req,res)=>{
    //console.log(req.body);
    // dept_image,dept_name,dept_description,dept_mh,dept_sf
   const addAppoinment= new Appoinment({
        _id: req.body._id,
        
        app_departments:req.body.app_departments,
        app_doctors:req.body.app_doctors,
        app_date:req.body.app_date,
        app_time:req.body.app_time,
        app_name:req.body.app_name,
        app_phone:req.body.app_phone,
        app_message:req.body.app_message,
    })
    addAppoinment.save().then((result)=>{
        console.log(result,"data save");
        req.flash('message',"Appoinment Booked successfully")
        res.redirect('/')
    }).catch((err)=>{
        console.log(err,"data not save");
        
    })
}

// -------------------------------------------------------------------------------

exports.about = (req, res) => {
    Department.find().then(department => {
        Doctor.find().limit(5).populate('doc_dept').then(doctor =>{
            res.render("about", {
                title: "User | About",
                dept: department,
                doc:doctor,
                data: req.user,
            })
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
}

exports.service = (req,res)=>{
    Service.find().then(service=>{
        res.render('service',{
            data: req.user,
            serviceData:service
        });
    })
    
    
}

const department = require('../model/department')
exports.department = (req,res)=>{
department.find().then(result =>{
        res.render('department',{
        data: req.user,
        deptData:result
    });
    })
}

exports.departmentsingle = (req,res)=>{
    const id=req.params.id
    console.log(id)
    department.findById(id).then(result=>{
        console.log(result)
        res.render('department-single',{
            title:"Department | "+result.dept_name,
            data: req.user,
            deptData:result
        });
    }) 
}
// DOCTOR
// -------------------------------------------------------------------------
exports.doctor = (req,res)=>{
    Doctor.find().populate("doc_dept").then(result => {
        res.render('doctor',{
            data: req.user,
            title: "Doctors",
            displayData: result,
        });
    })
   
    
}

exports.doctorsingle = (req, res) => {
    Doctor.find({ doc_slug: req.params.doc_slug }).populate("doc_dept").then(result => {
                console.log(result);
                res.render("doctor-single", {
                title: "View Single Doctor",
                displayData: result,
                data: req.user,
                message: req.flash("message"),
                alert: req.flash("alert"),
                })

    }).catch(err => {
        console.log(err);
    })
}

exports.appoinment = (req,res)=>{
    Doctor.find().populate("doc_dept").then(result => {
        Appoinment.find().exec((err,appData)  => {
        res.render('appoinment',{
        data: req.user,
        doctorData:result,
        appData:appData,
        message: req.flash("message"),
    });
})
})
    
}

const contact = require("../model/contact")
exports.contact = (req,res)=>{
    contact.find().then(cont =>{
        console.log(cont)
        res.render('contact',{
            data: req.user,
            contactData:cont,
        });
    })
}

exports.addPostView = (req, res) => {
    res.render("addpost", {
        data: req.user,
        title: "Write Your Post"
    })
}

exports.addPost = (req, res) => {
    const { id } = req.user
    const { title, subtitle, content } = req.body;
        Post({
            title,
            subtitle,
            content,
            image: req.file.filename,
            user: id
        }).save((err, data) => {
            if (!err) {
                req.flash("message", "Your Content Submited Successfully. Pending for Admin Approval");
                res.redirect("/")
            } else {
                req.flash("message", "Something Went Wrong. Please Try Again");
                res.redirect("/addpostview")
            }
        })
    // }
}

exports.addComment = (req, res)=>{
    const {post, name, comment} = req.body
    // console.log(req.body)
    if(req.body){
        Comment({
            post,
            name,
            comment
        }).save((err, data)=>{
            if(!err){
                res.redirect("/viewpost")
            }else{
                req.flash("message", "something went wrong")
                res.redirect("/viewpost")
            }
        })
    }
}

exports.viewPost = (req, res) => {
    Post.find().populate("user").then(result => {
        // console.log(result);
        Comment.find().populate("post").exec((err, comments) => {
            // console.log(comments.comment);
            if (!err) {
                if (result.length > 0) {
                    res.render("viewposts", {
                        posts: result,
                        title: "All Posts",
                        data: req.user,
                        message: req.flash("message"),
                        comments: comments
                    })
                } else {
                    return req.flash("message", "No Posts Found")
                }
            } else {
                return req.flash("message", "Something Went Wrong")
            }
        }) 
    })
}
const message = require('../model/messege')
exports.postMessage=(req,res)=>{
    const addMessage = new message({
        name: req.body.name,
        email:req.body.email,
        subject:req.body.subject,
        phone:req.body.phone,
        message:req.body.message,
    })
    console.log(addMessage)
    addMessage.save().then((result)=>{
        console.log(result,"data save");
        req.flash('message',"Message sent successfully")
        res.redirect('/contact')
    }).catch((err)=>{
        console.log(err,"data not save");
        
    })
}