const mongoose = require('mongoose');
const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require('../utils/apiFeatures');



exports.getProducts = async(req,res,next) => {
    console.log('req',req.query);
    const responsePerPage = 3; // per page products count
    let apiFeatures = APIFeatures(productModel.find(),req.query);
    apiFeatures = apiFeatures.search().filter().paginate(responsePerPage);

    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        message:"All Products",
        count : products.length,
        products
    })
}

exports.addProducts = catchAsyncError(async(req,res,next) => {
    const product = await productModel.create(req.body);
    res.status(201).json({
        message : "Product created successfully",
        success : true,
        product
    })
})

exports.getSingleProduct = async(req,res,next) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler('Invalid product ID', 400));
    }

    const product = await productModel.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found',400));
    }

    res.status(200).json({
        success : true,
        message : product.name,
        product
    })
}

exports.updateProduct = async(req,res,next) => {

     //To check wheather given id product is have or not
    const product = await productModel.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success : false,
            message : "Products not found"
        })
    }

    const updatedProduct = await productModel.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true
    })

    res.status(200).json({
        success : true,
        message : "Product are updated Successfully",
        product : updatedProduct
    })
}

exports.deleteProduct = async(req,res,next) => {

    const product = await productModel.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success : false,
            message : "Products not found"
        })
    } 

   await productModel.findByIdAndDelete(req.params.id);
   
   res.status(200).json({
       success : true,
       message : "Product Deleted Successfully"
   })
}