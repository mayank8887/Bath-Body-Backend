const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors= require("../middleware/cathAsyncerror");
const User = require("../models/usermodel");

//Register a user;

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{

    const {name,email,password}= req.body;

    const user = await User.create({
        name,email,password,avatar:{
            public_id:"This is a sample id",
            url:"profilepicUrl",
        }
    });

    const token = user.getJWTToken();
    res.status(201).json({
        success:true,
        token
    })
})


//Login user

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    //checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & password", 400))
    }

    const user = User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password"),401);
    }

    const isPasswordMatched = user.comparePassword();

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password"),401);
    }
})