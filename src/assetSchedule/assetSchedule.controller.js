const Joi = require("joi");
const { ObjectId } = require("mongodb");
const fs = require('fs');
const assetSchedule = require("./assetSchedule.model");

const controller = {

  async create(req, res) {
    try {
        const createSchema = Joi.object({
        assetInfo:Joi.string().required(),
        assetName: Joi.string(),
        location: Joi.string().required(),
        serviceVendor: Joi.string(),
        activity: Joi.string().required(),
        description: Joi.string(),
        userGroup: Joi.string().required(),
        attachFile: Joi.string(),
        originalFile: Joi.string(),
        assignee: Joi.string().required(),
        occurs: Joi.string().required(),
        startDate: Joi.date().required(),
        activityReminder: Joi.string().required(),
        endDate: Joi.date(),
        sendEmailTo: Joi.string(),
        vendorName: Joi.string(),
      });
      const { error } = createSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      const data = new assetSchedule({
        assetName: req.body.assetName,
        location: req.body.location,
        serviceVendor: req.body.serviceVendor,
        activity: req.body.activity,
        description: req.body.description,
        userGroup: req.body.userGroup,
        attachFile: req.file.path,
        originalFile: req.file.originalname,
        assignee: req.body.assignee,
        occurs: req.body.occurs,
        startDate: req.body.startDate,
        activityReminder: req.body.activityReminder,
        endDate: req.body.endDate,
        sendEmailTo: req.body.sendEmailTo,
        vendorName: req.body.vendorName,
        assetInfo:req.body.assetInfo,
      });
      const result = await data.save();
      res.status(201).json({
        statusCode: 201,
        msg: "successfully created",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  }, 



  //<------------------------getData-------------------->


  async getData(req, res) {
    try {
      let { limit, skip } = req.query;
      limit = +limit || 10;
      skip = +skip ?? 0;

      const result = await assetSchedule.find().limit(limit).skip(skip).lean();
      const count = await assetSchedule.count();
      const page = parseInt(req.query.skip) ||0;
      res.status(200).json({
        data: result,
        page: page,
        limit: limit,
        totalPages: Math.ceil(count / limit),
        totalResults: count,
        statusCode: 200,
      });
    } catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  },




  //<-----------------------updateData ------------------>


  async updateData(req, res) {
    try {
      
      const createSchema = Joi.object({
        assetInfo:Joi.string().required(),
        assetName: Joi.string(),
        location: Joi.string().required(),
        serviceVendor: Joi.string(),
        activity: Joi.string().required(),
        description: Joi.string(),
        userGroup: Joi.string().required(),
        attachFile: Joi.string(),
        originalFile: Joi.string(),
        assignee: Joi.string().required(),
        occurs: Joi.string().required(),
        startDate: Joi.date().required(),
        activityReminder: Joi.string().required(),
        endDate: Joi.date(),
        sendEmailTo: Joi.string(),
        vendorName: Joi.string(),
      });
      const { error } = createSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      
      const findData = await assetSchedule.findById({
        _id: new ObjectId(req.params.id),
      });

      console.log(findData.attachFile);
      if (!findData) {
        res.status(404).json({
          statusCode: 404,
          msg: "Not Found",
        });
      } 
      else {
        fs.unlinkSync(`${findData.attachFile}`);
        const result = await assetSchedule.findByIdAndUpdate(
          { _id: new ObjectId(req.params.id)},
          {
            assetInfo:req.body.assetInfo,
            assetName: req.body.assetName,
            location: req.body.location,
            serviceVendor: req.body.serviceVendor,
            activity: req.body.activity,
            description: req.body.description,
            userGroup: req.body.userGroup,
            attachFile: req.file.path,
            originalFile: req.file.originalname,
            assignee: req.body.assignee,
            occurs: req.body.occurs,
            startDate: req.body.startDate,
            activityReminder: req.body.activityReminder,
            endDate: req.body.endDate,
            sendEmailTo: req.body.sendEmailTo,
            vendorName: req.body.vendorName,
          },
          { new: true }
         );
        res.status(201).json({
          statusCode: 201,
          msg: "updated successfully",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "server error" });
    }
  },



  async deleteData(req, res) {
    const { id } = req.params;
    
    try {
      const del = await assetSchedule.findByIdAndDelete(id);
      if (!del) {
        return res.status(404).json({ message: "data not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = controller;
