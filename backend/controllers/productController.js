const productModel = require("../models/productModel")

exports.getProducts = async(req,res,next) => {
    const products = await productModel.find();
    res.status(200).json({
        success: true,
        message:"All Products",
        count : products.length,
        products
    })
}

exports.addProducts = async(req,res,next) => {
    const product = await productModel.create(req.body);
    res.status(201).json({
        message : "Product created successfully",
        success : true,
        product
    })
}

exports.getSingleProduct = async(req,res,next) => {
    const product = await productModel.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success : false,
            message : "Products not found"
        })
    }

    res.status(200).json({
        success : true,
        message : product.name,
        product
    })
}

exports.updateProduct = async(req,res,next) => {
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