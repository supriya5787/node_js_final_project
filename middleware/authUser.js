const jwt = require("jsonwebtoken")

exports.authJwt = (req, res, next) => {
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken, "shilpaAdmin597", (err, data) => {
            // console.log("2>authjwt", data);
            console.log(data)
            req.user = data;
            next()
        })
    } else {
        next()
    }
}

