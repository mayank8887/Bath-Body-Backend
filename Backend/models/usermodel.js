const mongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter your name"],
        maxlength:[30,"Name cannot exceed 30 character"],
        minlength:[4,"Name should have more than 5 characters"],
    },
    email:{
        type:String,
        required:[true,"Please Enter Email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"],

    },
    password:{
        type:String,
        required:[true,"Please Enter your password"],
        minlength:[8,"Password should be least 8 characters"],
        select:false,
    },
    avatar:{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
    },
    role:{
        type:String,
        default:"user",
    },

    resetPasswordToekn:String,
    resetPasswordExpire:Date,
})

userSchema.pre("save",async function(next){
    
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
})


//JWT token
userSchema.methods.getJWTToken= function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
};

module.exports = mongoose.model("user",userSchema);