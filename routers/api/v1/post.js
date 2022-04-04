const express = require('express');
const router = express.Router();
const postApi = require('../../../controllers/api/v1/postApi');
const passport = require('passport');

router.get('/',postApi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),postApi.destroy);

module.exports = router;