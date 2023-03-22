const jwt = require("jsonwebtoken")

exports.authAdminJwt = (req, res, next) => {
    if (req.cookies && req.cookies.adminToken) {
        jwt.verify(req.cookies.adminToken, "shilpaAdmin597", (err, data) => {
            // console.log("2>authjwt", data);
            req.admin = data;
            next()
        })
    } else {
        next()
    }
}