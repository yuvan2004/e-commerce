const express = require('express');
const Router = express.Router();
const OrderController = require('../controllers/OrderController');
const auth = require("../middlewares/auth")

Router.post('/addorder',auth, OrderController.orderdetails);

module.exports = Router;