const express = require('express');
const Router = express.Router();
const productController = require("../controllers/ProductController");
const auth = require("../middlewares/auth");

Router.post("/addproducts", productController.addproduct);
Router.get("/getproducts",auth, productController.getAllProducts);
Router.patch("/updateproducts/:id", productController.updateproduct);
Router.delete("/deleteproducts/:id", productController.deleteproduct);
module.exports = Router;