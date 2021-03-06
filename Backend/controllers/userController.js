const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors= require("../middleware/cathAsyncerror");
const User = require("../models/usermodel");
const sendToken = require("../utils/jwtToken");
const cathAsyncerror = require("../middleware/cathAsyncerror");
const sendEmail = require("../utils/sendEmail")
//Register a user;

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{

    const {name,email,password}= req.body;

    const user = await User.create({
        name,email,password,avatar:{
            public_id:"This is a sample id",
            url:"profilepicUrl",
        }
    });

   sendToken(user,201,res);
})


//Login user

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    //checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & password", 400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password"),401);
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password"),401);
    }
   
    sendToken(user,200,res);
    
})


//Logout User 
exports.logout = cathAsyncerror(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"Logged out"
    })
})


//Forget password 
exports.forgetPassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found", 404))
    }

    // Get Resetpassword Token

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}` 

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it`;

    try{
         await sendEmail({
             email:user.email,
             subject:"Body and Bath password Recovery",
             message,
         })

         res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
         })
    }
    catch(error){
         user.resetPasswordToken = undefined;
         user.resetPasswordExpire = undefined;

         await user.save({validateBeforeSave:false});

         return next(new ErrorHandler(error.message,500))
    }
})