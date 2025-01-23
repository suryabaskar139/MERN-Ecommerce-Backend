const mongoose = require('mongoose')
const validator = require('validator')

const authSchema = new mongoose.Schema({
   
        name : {
            type: String,
            required: [true, 'Please enter name']
        },
        email:{
            type: String,
            required: [true, 'Please enter email'],
            unique: true,
            validate: [validator.isEmail, 'Please enter valid email address']
        },
        password: {
            type: String,
            required: [true, 'Please enter password'],
            maxlength: [6, 'Password cannot exceed 6 characters'],
            select: false
        },
        avatar: {
            type: String
        },
        role :{
            type: String,
            default: 'user'
        },
        resetPasswordToken: String,
        resetPasswordTokenExpire: Date,
        createdAt :{
            type: Date,
            default: Date.now
        }
    })

    const authModel = mongoose.model('User',authSchema)

    module.exports = authModel