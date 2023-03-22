const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const flash = require("connect-flash")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const path = require("path")



const app = express()
app.use(express.static(path.join(__dirname, "public")))
// app.use(express.static(path.join(__dirname, "admin_assets")))


app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'shilpa1079',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs");
app.set("views", "views");


const authUser = require("./middleware/authUser")
app.use(authUser.authJwt)
// const route = require("./route/routes")
// app.use(route)
const homeRoute = require("./route/homeRoute")
app.use(homeRoute)

// const aboutRoute = require("./route/aboutRoute")
// app.use(aboutRoute)

// const serviceRoute = require("./route/serviceRoute")
// app.use(serviceRoute)

// const departmentRoute = require("./route/departmentRoute")
// app.use(departmentRoute)

// const doctorRoute = require("./route/doctorRoute")
// app.use(doctorRoute)

// const blogRoute = require("./route/blogRoute")
// app.use(blogRoute)

// const contactRoute = require("./route/contactRoute")
// app.use(contactRoute)


const authAdmin = require("./middleware/authAdmin")
app.use(authAdmin.authAdminJwt)
const adminRoute = require("./route/adminRoute")
app.use("/admin", adminRoute)


const dbcon = "mongodb+srv://shilpa:6V0At9S2pHK5v4Ox@cluster0.c1asjs8.mongodb.net/roleBasedAuth5";
const port = 4404

mongoose.connect(dbcon, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => app.listen(port, () => console.log(`Server Running at http://localhost:${port}`)))
    .catch(err => console.log(err))