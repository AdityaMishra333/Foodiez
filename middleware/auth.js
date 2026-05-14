const jwt = require("jsonwebtoken")

module.exports = (req,res,next) => {
    const token = req.cookies.token

    if(!token) return res.status(401).json({message : "Unauthorised"})

    req.user = jwt.verify(token, process.env.JWT_SECRET)

    next()
}