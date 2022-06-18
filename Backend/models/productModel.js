const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please Enter product price"],
        maxlength:[8,"Price can't exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
       {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
       }
    ],
    category:{
         type:String,
         required:[true,"Please enter product category"],
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[4,"Stock cannot exeed 4 characters"],
        default:1
    },
    numofRevies:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
            }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model("product",productSchema);