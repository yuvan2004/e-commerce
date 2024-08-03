const ProductModel = require("../models/ProductModel");
const { v4: uuidv4 } = require('uuid');
//ADDPRODUCT
const addproduct = async(req,res)=>{
    try{
        const {id,title,description,category,price,image,rating} = req.body;
        const product = new ProductModel({
            id:uuidv4(),
            title,
            description,
            category,
            price,
            image,
            rating  
            
        })
        await product.save();
        res.status(200).json({ status: "success", message: "Task created sucessfully"});
    } catch (error) {
        res.status(500).json({ status: "failed", message: "Cannot create task", error: error.message});
    }
}


const getAllProducts = async (req, res) => {
    try{
        const products = await ProductModel.find();
        res.json({status: "sucess",message: "products fetched"})
        console.log(products);
    }
    catch (err) {
        res.json({status:"failure", message:"error occured"})
        console.log("error occured");
    }
}

const updateproduct = async (req,res) => {
    const Id = req.params.id;
    try{
       const prod = await ProductModel.findById(Id);
       if(prod){
        await prod.updateOne(
            {
                "title":req.body.title,
                "description":req.body.description,
                "category":req.body.category,
                "price":req.body.price,
                "image":req.body.image,
                "rating":req.body.rating
            })
       }
       res.status(200).json({ status: "success", message: "Task Updated successfully" });
    } catch (error) {
        res.status(500).json({ status: "failed", message: "Cannot update task", error: error.message });
    }
}

       
const deleteproduct = async(req,res) => {
    try{
        const Id = await ProductModel.findByIdAndDelete();
        res.status(200).json({ status: "sucess", message: "Task deleted sucessfully"});

    }
    catch (err){
        res.status(500).json({ status: "failure", message:"cannot delete task",error:err.message})
    }
}

module.exports = {addproduct,getAllProducts,updateproduct,deleteproduct};

