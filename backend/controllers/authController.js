const catchAsyncError = require("../middlewares/catchAsyncError");
const authModel = require("../models/authModel");


exports.registerUser = catchAsyncError(async(req,res,next) => {

    console.log('test',req.body);
    

    const {email , name, avatar, password} = req.body

    const user = await authModel.create({
        name, email, password, avatar
    })

    res.status(201).json({
        sucess : true,
        user
    })
})