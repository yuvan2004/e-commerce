const express = require('express');
const app = express();
const productrouter = require("./routes/productRoutes")
const bodyparser = require("body-parser")
app.use(bodyparser.json())
const Userroute = require("./routes/UserRoutes")
const cartroute = require("./routes/CartRoutes")
const Orderroute = require("./routes/OrderRoutes")
//pp.use(cors());

const mongoose = require('mongoose');
// const OrderModel = require('./models/OrderModel');

mongoose.connect("mongodb+srv://yuvanshankar:1234@cluster0.n1qqab4.mongodb.net/ecommerce"
)
.then(()=> {
    console.log("Mongodb connected");
});
app.set("view engine", "ejs");

app.use("/",productrouter);
app.use("/",Userroute);
app.use("/",cartroute);
app.use("/",Orderroute);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
