const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friend_controller');

router.get('/toggle',friendController.toggle_friend);

module.exports = router;