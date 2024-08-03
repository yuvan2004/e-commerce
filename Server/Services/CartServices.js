const cart = require("../models/cartModel");

exports.deleteProduct = (userid,productid) => {
    const cart = cart.findOne({user_id: userid});
    const product = cart.product.filter((product)=> productid !=productid);
    const newCartItems = new Cart ({
        user_id: userid,
        products: product,
    });
    await = newCartItems.save;
}
module.exports = {deleteProduct}