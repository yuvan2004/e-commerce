const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const newUser = async(req,res)=>{
    try{
    const {username,email,password} = req.body;
    const user = await UserModel.findOne({ email })
    if(user){
        return res.status(400).json({status:"failure",message:"username or email already exists"})
    }
    if(!user){
        const newUser = new UserModel({
            username,
            email,
            password
        })
        await newUser.save();
        res.status(200).json({status:"success", message:"account created successfully"})
        }
    }
    catch(err){
        res.status(500).json({status:"failure",message:"cannot create new user"})
    }
}

const login = async(req,res)=>{
    const {email,password} = req.body;
    const user =await UserModel.findOne({email})
    try{
        if(!user){
            return res.status(400).json({status:"failure",message:"user not found"})
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        // if(!isValidPassword){
        //     return res.status(400).json({status:"failure",message:"invalid password"})
        // }
        const token = jwt.sign({id:user._id},"secret_key",{
            expiresIn:"1h"
        })
        res.json({token})
    }
    catch(err){
        res.status(500).json({status:"failed", error:err.message});
    }
}


module.exports = {newUser,login};