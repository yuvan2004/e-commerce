const OrderModel = require('../Models/OrderModel');
const CartModel = require('../models/cartModel');
const UserModel = require('../models/userModel');
const { v4: uuidV4 } = require('uuid');


const orderdetails = async (req, res) => {
    const user_id = req.user.id;
    const product_id = req.body.product_id;
    console.log(user_id);
    try{
        const user = await UserModel.findOne({user_id});
        const cart = await CartModel.findOne({product_id});
        // console.log("user",user.email);
        if(user){
                const order = new OrderModel({
                    id: uuidV4(),
                    cust_name: req.body.cust_name,
                    cust_phone: req.body.cust_phone,
                    cust_address: req.body.cust_address,
                    order_date: new Date(),
                    delivery_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), 
                    total_amount: req.body.total_amount,
                    order_status: req.body.order_status,
                    user_id: req.user.id,

                    // user_email: req.user.email
                });
                 await order.save();
                console.log(order);
                res.status(200).json({status:"success",message:"Order placed successfully",order});

            }else{
                res.status(400).json({status:"failure",message:"User not found"});
        }
    }
    catch(err){
        res.status(401).json({status:"failure",message:err.message});
    }
}


const getOrder = async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await OrderModel.findById(orderId).populate('user_id', 'name email');

        if (!order) {
            return res.status(404).json({ status: "failure", message: "Order not found" });
        }  

       
        const user = await UserModel.findById(order.user_id);

        
        const orderDetails = {
            id: order._id,
            products: order.products.map(product => ({
                title: product.title,  
                desc: product.desc,
                img: product.img,
                price: product.price,
                quantity: product.quantity
            })),
            subtotal: order.subtotal,
            orderDate: order.order_date,
            estOrderDate: order.delivery_date,
            status: order.order_status,
            customer: {
                name: user ? user.name : '',
                email: user ? user.email : '',
                phone: order.cust_phone,
                address: order.cust_address
            }
        };

        res.status(200).json({ status: "success", orderDetails });
    } catch (err) {
        res.status(500).json({ status: "failure", message: err.message });
    }
}

module.exports = {orderdetails,getOrder};

