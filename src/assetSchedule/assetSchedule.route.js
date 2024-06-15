
const express=require('express');
const router=express.Router();

const {create,getData,updateData,deleteData}=require('./assetSchedule.controller');
const upload=require('../middlewares/uploadfile')

router.post('/assetSchedule',upload.single('file'),create);
router.get('/assetSchedule',getData);
router.put('/assetSchedule/:id',upload.single('file'),updateData);
router.delete('/assetSchedule/:id',deleteData);

module.exports=router;

