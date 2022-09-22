const express = require('express');
const {registerUser,loginUser,userApplication,viewStatus} = require('../controllers/userController');
const router = express.Router();



router.route('/signup').post(registerUser)
router.route('/login').post(loginUser)
router.post('/userApplication',userApplication)
router.get('/status/:id',viewStatus)
module.exports = router