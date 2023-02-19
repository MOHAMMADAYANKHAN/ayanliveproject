const mongoose = require('mongoose');
const userAuthSchema = new mongoose.Schema({
   name: {
    type:String,
    required:[true,'Please add a name']
   },
   email: {
    type:String,
    required:[true,'Please add email']
   },
   password: {
    type:Number,
    required:[true,'Please add a password']
   },

   
},{
    timestamps:true
});

module.exports = mongoose.model('userAuth',userAuthSchema);