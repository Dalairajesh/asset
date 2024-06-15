const express= require('express');
const router = express.Router();
const {QrCodeGenration}= require('./assetQrCode.controller');

router.post('/QrCode/:id',QrCodeGenration);