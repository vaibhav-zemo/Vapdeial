const express = require('express');
const router = express.Router();
const create = require('../../../controllers/api/v1/userApi');

router.post('/create-session', create.createSession);


module.exports = router;
