const db = require('../config');
db();
const bcrypt = require('bcryptjs')
const mongodb= require('mongodb');
const user = require('../Model/userSchema')
const login = require('../Model/loginModel')
const asyncHandler = require('express-async-handler');
const getuser=asyncHandler (async(req,res)=>{
    let data = await user.find();
    console.log("======>",data);
    res.status(200).json(data)
})

const setUsers= asyncHandler(async(req,res)=>{
    const { name , email,password,number} = req.body
    if(!name && !email,!password && !number){
        res.status(400)
        throw new Error('Please add a all body filds')
    }
    
    let data= await user.create({name:req.body.name ,email:req.body.email,password:req.body.password,number:req.body.number})
    console.log("====>",data);
    res.status(200).json(data)
})
const loginserver=asyncHandler(async (req,res)=>{

    const {email,password} = req.body;
    const userExists = await login.findOne({ email })
        if (userExists) {
            res.status(400);
            throw new Error('Email already exists')
        }
        const passexits = await login.findOne({password})
        if(passexits){
            res.status(400);
            throw new Error('Password already exists')
        }
        else{
    let result = await login.create({email:req.body.email,password:req.body.password});
    res.status(200).json(result)
    }
})
// const search = asyncHandler(async(req,res)=>{
//  let data = await user.find(req.params_id)
//  res.status(200).json(data)
// })
// const setUsers = asyncHandler(async (req, res) => {

//     const { name, email, password } = req.body;
//     if (!name && !email && !password) {
//         res.status(400);
//         throw new Error('Please add a All body filds')
//     }
//     const userExists = await user.findOne({ email })
//     if (userExists) {
//         res.status(400);
//         throw new Error('User already exists')
//     }
//     const salt = await bcrypt.getSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)

//     const data = await user.create({
//         name,
//         email,
//         password: hashedPassword,
//     })
//     console.log("====>=============================", data);
//     if (data) {
//         res.status(201).json({
//             _id: data.id,
//             name: data.name,
//             email: data.email,
//         })
//     } else {
//         res.status(400)
//         throw new Error('Invalid User Data')
//     }


// })

const updateuser=asyncHandler( async (req,res)=>{
    let findid = await user.findById(req.params._id);
    if(!findid){
        res.status(400);
        res.send("user not found");
    }
    const updateusers = await user.findByIdAndUpdate(req.params._id,req.body,{
        new : true
    })
    console.log("=====>",updateusers);
    res.status(200).json({message : `updatedata ${req.params._id}`})
})

const deleteuser= asyncHandler( async(req,res)=>{
    let findid = await user.findById(req.params._id);
    if(!findid){
        res.status(400);
        res.send("user not found");
    }
     await findid.remove();

   
    res.status(200).json({message: `delete data ${req.params._id}`});
})

module.exports={
    getuser,
    setUsers,
    updateuser,
    deleteuser,
    loginserver,
    

}