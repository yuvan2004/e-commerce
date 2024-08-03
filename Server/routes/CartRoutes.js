const express = require("express");
const Router = express.Router();
const CartController = require("../controllers/cartController");
const auth = require("../middlewares/auth");

Router.post("/addtocart",auth,CartController.addtocart);
Router.get("/getcart",auth,CartController.getcart);
Router.delete("/deletecart",auth,CartController.deletecart);
Router.patch("/replaceQuantity",auth,CartController.replaceQuantity);



module.exports = Router;