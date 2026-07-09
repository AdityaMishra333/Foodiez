const jwt = require("jsonwebtoken")

module.exports = (req,res,next) => {
    const token = req.cookies.token

    if(!token) return res.redirect('/admin-login')

    try{
        req.admin = jwt.verify(token, process.env.JWT_SECRET)
        next()
    }
    catch(err){
        return res.redirect('/admin-login')
    }
}