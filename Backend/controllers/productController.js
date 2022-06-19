const { restart } = require("nodemon");
const Product=require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors= require("../middleware/cathAsyncerror");
const ApiFeatures = require("../utils/apifeatures");


//Create Product;

exports.createProduct= catchAsyncErrors(async(req,res,next)=>{
  
      const product=await Product.create(req.body);

      res.status(201).json({
            success:true,
            product
      })
})


//Get all Products;

exports.getAllProducts = catchAsyncErrors(async(req,res) =>{

      const resultPerPage = 5;
      const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
      const products = await apiFeature.query;
      res.status(200).json({
            success:true,
            products,
      })
})



//Get Product details;

exports.getProductDetails= catchAsyncErrors(async(req,res,next)=>{
      const product = await Product.findById(req.params.id);

      if(!product){
            return next(new ErrorHandler("Product not found",404))
      }

      res.status(200).json({
            success:true,
            product,
      })
})


//Update Product --Admin;

exports.updateProduct= catchAsyncErrors(async(req,res)=>{

      let product = await Product.findById(req.params.id);

      if(!product){
            return next(new ErrorHandler("Product not found",404))
      }
      product= await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});

      res.status(200).json({
            success:true,
            product
      })
})


//Delete Product;


exports.deleteProduct= catchAsyncErrors(async(req,res,next)=>{

      const product = await Product.findById(req.params.id);
      
      if(!product){
            return next(new ErrorHandler("Product not found",404))
      }

      await product.remove();

      res.status(200).json({
            success:true,
            message:"Product deleted Successfully"
      })
})


