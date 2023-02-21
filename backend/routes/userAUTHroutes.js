const express = require('express');
const router = express.Router();
router.use(express.json());
const  { registeruser, loginuser,getMe} = require('../controllers/userAuthControllers')
router.post('/',registeruser);
router.post('/login',loginuser)
router.get('/me/:name',getMe)





module.exports = router;