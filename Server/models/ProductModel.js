const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    [
        {
            id:{
                type:String,
                unique:true,
            },
            title:{
                type:String,
                required:true,
            },
            description:{
                type:String,

            },
            category:{
                type:String,
            },
            price:{
                type:Number,
                required:true,
            },
            image:{
                type:String,
            },
            rating:{
                rate:{
                    type:Number,
                },
                count:{
                    type:Number,
                },
            },    
        },
    ],
);
const Product = mongoose.model("products",ProductSchema);
module.exports = Product;