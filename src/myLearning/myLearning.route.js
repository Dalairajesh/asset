const express = require("express");
const {ObjectId}= require('mongodb')
const router = express.Router();
const staff = require("./mystaff.model");
const rights = require("./myrights.model");
const QRCode = require("qrcode");
const addAssetschema= require('../addAsset/addAsset.model');
const controller = {
  async createStaff(req, res) {
    const data = new staff({
      name: req.body.name,
      role: req.body.role,
    });
    const result = await data.save();
    res.send(result);
  },
  async createRight(req, res) {
    const data = new rights({
      staff_id: req.body.staff_id,
      right: req.body.right,
    });
    const result = await data.save();
    res.send(result);
  },
  async getData(req, res) {
    const data = await staff.find();
    if (!data) {
      res.send("not found");
    }
    res.send(data);
  },
  async getRights(req, res) {
    const data = await rights.find();
    if (!data) {
      res.send("not found");
    }
    res.send(data);
  },
  async getAllData(req, res) {
    const data = await rights
      .find({ _id: req.body.right_id })
      .populate("staff_id");
    if (!data) {
      res.send("not found");
    }
    res.send(data);
  },
  async QRcodeGenration(req,res) {
    const findData=await addAssetschema.findById({_id:new ObjectId(req.params.id)});
    const data={
        assetname:findData.assetName,
        assetCode:findData.assetCode
    }

    let stringdata = JSON.stringify(data)

    // // // Print the QR code to terminal
    QRCode.toString(stringdata, { type: "terminal" }, function (err, QRcode) {
      if (err) return console.log("error occurred");

    // Printing the generated code
      console.log(QRcode);
    });
    
    // Converting the data into base64
    QRCode.toDataURL(stringdata, function (err,code) {
      if (err) return console.log("error occurred");

      // Printing the code
      res.send(code);
    });

  },
};
router.post("/staff", controller.createStaff);
router.post("/QRCode/:id", controller.QRcodeGenration);
router.get("/staff", controller.getData);
router.post("/right", controller.createRight);
router.get("/right", controller.getRights);
router.get("/right/populate", controller.getAllData);

module.exports = router;
