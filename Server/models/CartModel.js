const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true,
    },
    products:[
        {
            products_id: String,
            quanitity: String,
        },
    ],

});

const CartModel = mongoose.model("Carts", CartSchema);
module.exports = CartModel;
