const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log("router Loaded");

router.get('/',homeController.home);
router.use('/user',require('./user'));
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));
router.use('/like',require('./like'));
router.use('/friendship',require('./friend'));

router.use('/api',require('./api'));

module.exports = router;