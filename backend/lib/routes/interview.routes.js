const express = require('express');
const router = express.Router();
const { authUser } = require(__basedir + '/lib/controllers/user.controller');
const { addOne, getList, getOne, updateOne, deleteOne } = require(__basedir + '/lib/controllers/interview.controller');

router.post('/add', authUser, addOne);
router.get('/getList/:key', authUser, getList);

router.get('/getOne/:id', authUser, getOne);
router.put('/updateOne/:id', authUser, updateOne);
router.delete('/deleteOne/:id', authUser, deleteOne);

module.exports = router;
