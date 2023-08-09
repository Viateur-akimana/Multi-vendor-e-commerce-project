const ErrorHandler = require("../utils/ErrorHandler");
const handleAsync = require("./handleAsyncErrors");
const jwt = require("jsonWebToken");
const User = require("../model/user")

//checking for the token to login
const isAuthenticated = async(req,res,next)=>{
const token=req.cookie;
if(!token){
    return next(new ErrorHandler("please login to continue",400))
}
//verifying for the token
const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
req.user=await User.findById(decoded.id)
next()
}
module.exports=isAuthenticated;