const User = require("../model/user")


// user sign up email duplicacy check
exports.checkDuplicateEntries = (req, res, next) => {
    if (req.body.name && req.body.email && req.body.password && req.body.confpassword) {
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                console.log(err);
                return;
            } else if (user) {
                req.flash("message", "Email Already Exists");
                return res.redirect("/signup");
            }
            else if (req.body.password !== req.body.confpassword) {
                req.flash("message", "Password & Confirm Password Are Not Matched");
                return res.redirect("/signup")
            }
            next();
        })
    } else {
        req.flash("message", "All the Fields are Required!!!");
        return res.redirect("/signup")
    }
}