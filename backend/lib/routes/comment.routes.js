const express = require('express');
const router = express.Router();
const { authUser } = require(__basedir + '/lib/controllers/user.controller');
const { addOne, reply, view, deleteOne } = require(__basedir + '/lib/controllers/comment.controller');

router.post('/add', authUser, addOne);
router.post('/reply', authUser, reply);
router.get('/view/:post', authUser, view);
router.delete('/delete/:id', authUser, deleteOne);

module.exports = router;
