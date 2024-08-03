const { response } = require("express");
const CartModel = require("../models/cartModel");

const addtocart = async(req,res)=>{
    try{
        const {product_id,quantity} = req.body;
        const user_id = req.user.id;
        const cart = await CartModel.findOne({user_id});
        if(cart){
            let product = cart.products.find(p => p.product_id === product_id);
            if(product){
                product.quantity = quantity;
                res.status(200).json({status:"success",message:"Product quantity updated",product});    
            }
            else{
                let product = {product_id,quantity};
                cart.products.push(product);
                await cart.save(); 
                res.status(200).json({status:"success",message:"Product Pushed to cart",product});
            }
            await cart.save();
        } 
        
        else{
            const newCart = new CartModel({
                user_id,
                products : [{product_id,quantity}]
            });
            await newCart.save();
            res.status(200).json({message: "New Product added to cart"});
        }
        // res.status(200).json({message: "Product added to cart"});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}
const getcart = async (req, res) => {
    const userid = req.userid;
    console.log(userid);
    try {
      const cart = await cart.findOne({ userid });
      if (cart) {
        const productDetails = await Promise.all(
          cart.products.map(async (item) => {
            const product = await product.findOne({ id: item.productid }, 'title description image price');
            return {
              title: product.title,

              description: product.description,
              image:product.image,

              price:  product.price,
              quantity: item.quantity,
            };
          })
        );
  
        res.status(200).send({productDetails});
      } else {
        res.status(401).send({ message: "No items found" });
      }
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  };



  const deletecart = async (req, res) => {
    const user_id = req.user.id;
    try {
      const { product_id } = req.body;
      const cart = await CartModel.findOne({ user_id});
      if (cart) {
        const productIndex = cart.products.findIndex(p =>p.product_id === product_id);
        if(productIndex > -1) {
          cart.products.splice(productIndex, 1);
          await cart.save();
          res.status(200).json({ status: "sucess", message: "product removed from cart sucessfully"});
        }else {
          res.status(404).json({ status: "failure", message: "product  is not found in cart"});
        }

      } else {
        res.status(404).json({ status:"failure", message: "cart not found"});
      }
      
    }catch (err) {
      res.status(500).json({ error: err.message});
    }
  };



  const replaceQuantity = async (req, res) => {
    try {
      const { product_id, quantity } = req.body;
      const user_id = req.user.id;
      const cart = await CartModel.findOne({ user_id});
      if(cart){
        const product = cart.products.find(p => p.products_id === product_id);
        if (product) {
          product.quantity = quantity;
          await cart.save();
          res.status(200).json({ status: "success", message: "Product quantity replaced sucessfully",product});
        } else {
          res.status(404).json({ status: "failure", message: "Product not found in cart"});
        }
      } else {
        res.status(404).json({ status: "failure", message: "cart not found"});
      }
    } catch (err) {
      res.status(500).json({ error: err.message});
    }
  };
  
  module.exports={addtocart,getcart,deletecart,replaceQuantity};

       
 

          
   
  

    
    
    

