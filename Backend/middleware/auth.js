const ErrorHandler = require("../utils/errorhandler");
const cathAsyncerror = require("./cathAsyncerror");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

exports.isAuthenticatedUser = cathAsyncerror(async(req,res,next)=>{
     
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to access this resources",401))
    }
    console.log(token)
    
    const decodeData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodeData.id)

    next()

})

exports.authorizeRoles = (...roles)=>{

    return(req,res,next)=>{

        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource `,403))
        }

        next();
    };

};