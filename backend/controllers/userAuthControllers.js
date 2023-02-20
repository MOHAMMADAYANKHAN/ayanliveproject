const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const asynchandler = require('express-async-handler');
const User = require('../Model/userAuthModel');





//des registeruser  new users
// routes post /api/userAuth
// access public

const registeruser = asynchandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("please add all fields");
    }
        //check userExits user email
        const userExists = User.findOne(email)
        if(userExists){
            res.status(400);
            throw new Error("Email already exits")
        }
        //check userExits user password
        const salt = await bcrypt.getSalt(10)
         const hashedPassword = await bcrypt.hash(password,salt);
        const passexits = User.findOne(password)
       const data = User.create({
        name: req.body,
        email : req.body,
        password:hashedPassword
})


       if(data){
        res.status(201).json({
            _id:data.id,
            name:data.name,
            email:data.email
        })
       }else{
        res.status(400)
        throw new Error("data is already exits")
       }
    })

//des loginuser  new users
// routes post /api/userAuth/login
// access public
const loginuser = asynchandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("please add all fields");
    }
    //check userExits user email
    const userExists = User.findOne(email)
    if (userExists) {
        res.status(400);
        throw new Error("Email already exits")
    }
    const passwordesits = User.findOne(password)
    if (passwordesits) {
        res.status(400)
        throw new Error("Password already exits")
    } else {
        res.json({ name: req.body, email: req.body, password: req.body })
    }

    // res.json({message:"login user"});

})


//des getMe  new users
// routes post /api/userAuth/me
// access public
const getMe = asynchandler(async (req, res) => {
    // let data = user.find();

    let data = await User.find({
        "$or": [
            { "name:": { $regax: req.params.key } },
            { "email": { $regax: req.params.key } },
            { "password": { $regax: req.params.key } }

        ]
    })
    res.json({ message: data });
    // res.send(data)
    // res.json(data);

})




module.exports = {
    registeruser,
    loginuser,
    getMe
}