const express = require('express');
const Joi = require('joi');
const addassetschema = require('./addAsset.model');
const router = express.Router();
const csv = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');

const { createcontroller, getcontroller, updatecontroller, deletecontroller,datasave } = require('./addAsset.controller')
const upload = require("../middlewares/uploadfile");


router.post('/create', upload.fields([{ name:'image'},{name:'filesss'}]), createcontroller);
router.get('/getdata', getcontroller);
router.put('/update/:id', upload.fields([{ name: 'image' }, { name: 'filesss' }]), updatecontroller);
router.delete('/delete/:id', deletecontroller);

/// bulk upload api

router.post('/bulkUpload', upload.single('file'),(req, res)=> {   
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const filePath = req.file.path;
    const fileExtension = req.file.originalname.split('.').pop();
    if (fileExtension === 'csv') {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', async (data) => {results.push(data)})
        .on('end', () => {
          datasave(results);
          res.json({ message: 'Successfully CSV file uploaded' });
        });
    }
    else if (fileExtension === 'xlsx') {
      const workbook = xlsx.readFile(filePath);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(worksheet);
      datasave(data);
      res.json({ message: 'Successfully XLSX file uploaded'});
    }
    else {
      res.status(400).json({ error: 'Unsupported file format'});
    }
  } catch (error) {
    console.log(error);
    res.status(502).json({ "error": "server error" })
  }
} )

module.exports = router;