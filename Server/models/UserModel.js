const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
    {
        username : {
            type: String,
            required: true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        }
    }
);
//hash password before saving user  to data base
UserSchema.pre("save", async function(next) {
    if(!this.isModified("Password")){
        return next();

    }
    const salt = bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const UserModel = mongoose.model("UserSchema", UserSchema);
module.exports = UserModel;
