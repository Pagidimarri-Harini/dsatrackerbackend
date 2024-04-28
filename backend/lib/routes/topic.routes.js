const express = require('express');
const router = express.Router();
const { authUser } = require(__basedir + '/lib/controllers/user.controller');
const {
    getData,
    updateData,
    resetData,
    exportData,
    importData } = require(__basedir + '/lib/controllers/topic.controller');

router.get('/getData', authUser, getData);
router.put('/updateData', authUser, updateData);
router.delete('/resetData', authUser, resetData);
router.post('/exportData', authUser, exportData);
router.post('/importData', authUser, importData);

module.exports = router;
