const express = require('express');
const router = express.Router();
const { addAcc, loginAcc, authUser, getId } = require(__basedir + '/lib/controllers/user.controller');

router.post('/signup', addAcc);
router.post('/login', loginAcc);
router.get('/getId', authUser, getId);

module.exports = router;
