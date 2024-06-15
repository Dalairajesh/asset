const Joi = require("joi");
const { ObjectId } = require("mongodb");
const discardAsset=require('./assetDiscard.model');
const assetSchema = require('../addAsset/addAsset.model');
const assetSchedule = require('../assetSchedule/assetSchedule.model')
const controller = {

///<------------------------discardAsset----------------------->



async discardAsset(req,res){
  try {
          const createschema = Joi.object({
          assetId:Joi.string(),
          soldValue: Joi.number().required(),
          wdv:Joi.number(),
          reason: Joi.string().required(),
          discardate:Joi.date(), 
          vendorname:Joi.string(),
          remark: Joi.string(),
          taxGroup: Joi.string(),
          uploadfile: Joi.string(),
          originalfile: Joi.string(),        
      });
      const { error } = createschema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      const data = new discardAsset({
          soldValue:req.body.soldValue,
          wdv:req.body.wdv,
          reason:req.body.reason,
          discardate:req.body.discardate,
          vendorname:req.body.vendorname,
          remark:req.body.remark,
          taxGroup:req.body.taxGroup,
          uploadfile:req.file.path,
          originalfile:req.file.originalname,
      });
      const asset= await assetSchema.findByIdAndDelete(req.body.assetId);
      if(asset==null){
        res.status(201).json({msg:'No data found'});
      }
      else{
        const assetSch = await assetSchedule.findByIdAndDelete(req.body.assetId);
        const result = await data.save();
      res.status(201).json({
        statusCode: 201,
        msg: "successfully Discarded",
        data: result,
      });
        
      }
    } 
    catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  },



  //<------------------------getdata-------------------->

  async getdata(req,res){
    try {
      let {limit , skip} = req.query;
      limit = +limit ||10;
      skip = +skip ?? 0;

      const result = await discardAsset.find().limit(limit).skip(skip).lean();
      const count = await discardAsset.count();
      const page = parseInt(req.query.skip) || 0;
      res.status(200).json({
          "data":result,
          "page":page,
          "limit":limit,
          "totalPages": Math.ceil(count / limit),
          "totalResults": count,
          "statusCode":200,
      })
    } catch (error) {
      res.status(500).json({ statusCode:500, error: error.message });
    }
  },


//<------------------------ deleteupdate --------------->

  async deletedata(req,res){
    
      const { id } = req.params;
      try {
        const del = await discardAsset.findByIdAndDelete(id);
        if (!del) {
          return res.status(404).json({ message: "data not found" });
        }
        res.json({ message: "User deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
  }

};
module.exports = controller;
