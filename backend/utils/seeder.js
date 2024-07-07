const connectDatabase = require('../config/database');
const products = require('../data/productsData.json');
const productModel = require('../models/productModel');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: "backend/config/config.env"});


connectDatabase();

const seedProducts = async() => {
   try {
    await productModel.deleteMany();
    console.log("All products has been deleted");
    await productModel.insertMany(products);
    console.log("All products are added sucessfully!");

   } catch (error) {
    console.log(error);
   }
}

seedProducts();