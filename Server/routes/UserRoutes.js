const express = require('express')
const Router = express.Router()
const UserController = require('../Controllers/UserController')

Router.post("/newuser", UserController.newUser);
Router.post("/login", UserController.login);

module.exports=Router;
