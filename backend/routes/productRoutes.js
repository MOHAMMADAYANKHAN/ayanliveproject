const express= require('express');
const { getproduct, addproduct, updateproduct, deleteproduct } = require('../controllers/productControllers');
const Router = express.Router();

Router.use(express.json())


Router.get('/getproduct',getproduct)
    

Router.post('/insertproduct',addproduct)
Router.put('/updateproduct/:_id',updateproduct)
Router.delete('/deleteproduct/:_id',deleteproduct)


module.exports = Router