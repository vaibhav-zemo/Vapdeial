const express = require('express');
const router= express.Router();
const userController = require('../controllers/user_controller');

router.get('/profile',userController.profile);
router.get('/post',userController.post);
router.get('/sign_in',userController.sign_in);
router.get('/sign_up',userController.sign_up);
router.post('/create_user',userController.create_user);


module.exports = router;