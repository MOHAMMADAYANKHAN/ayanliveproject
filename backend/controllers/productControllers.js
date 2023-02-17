const db = require('../config');
db();
const mongodb= require('mongodb');
const product = require('../Model/productModel');
const asyncHandler = require('express-async-handler');


const getproduct= async(req,res)=>{
    let data = await product.find();
    console.log("======>",data);
    res.status(200).json(data)
}



const addproduct= asyncHandler(async(req,res)=>{

    const { title , dis,price,quentity} = req.body
if(!title && !dis && !price && !quentity){
    res.status(400).json({message:"Please add all Filed"})
}
    let data= await product.create({title:req.body.title ,dis:req.body.dis,price:req.body.price,quentity:req.body.quentity})
    console.log("====>",data);
    res.status(200).json(data)
})

const updateproduct=asyncHandler( async (req,res)=>{
    let findid = await product.findById(req.params._id);
    if(!findid){
        res.status(400);
        res.send("user not found");
    }
    const updateusers = await user.findByIdAndUpdate(req.params._id,req.body,{
        new : true
    })
    console.log("=====>",updateusers);
    // let data = await db();
    // let result = await  data.updateOne({_id: new mongodb.ObjectId(req.params._id)},{$set:req.body});
    // res.status(200).json({result})
    res.status(200).json({message : `updatedata ${req.params._id}`})
})
const deleteproduct= asyncHandler( async(req,res)=>{
    let findid = await product.findById(req.params._id);
    if(!findid){
        res.status(400);
        res.send("user not found");
    }
     await findid.remove();

   
    res.status(200).json({message: `delete data ${req.params._id}`});
})

module.exports={
    getproduct,addproduct,updateproduct,deleteproduct
}