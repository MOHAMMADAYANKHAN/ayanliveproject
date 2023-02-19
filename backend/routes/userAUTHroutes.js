const express = require('express');
const router = express.Router();
router.use(express.json());
const  { loginuser,getMe} = require('../controllers/userAuthControllers')
// router.post('/',registeruser);
router.post('/login',loginuser)
router.get('/me',getMe)





module.exports = router;