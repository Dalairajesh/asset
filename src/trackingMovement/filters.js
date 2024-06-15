const transferSchema = require( '../assetTransfer/assetTransfer.model');
const assetschema = require('../addAsset/addAsset.model');
const express = require('express');
const router = express.Router();

router.post('/deptFilter',async(req,res)=>{
    try {
        let {limit , skip} = req.query;
        limit = +limit ||10;
        skip = +skip ?? 0;
        // const result= await addTransferSchema.find(); 
        // console.log(result);                          
        const result = await transferSchema.find({$or:[
                                          {newlocation:req.body.filter},
                                          {user:req.body.filter}
                                         ]})
                                    .populate('assetInfo')
                                    .limit(limit)
                                    .skip(skip)
                                    .lean();
        const count = await transferSchema.count();
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
      
      /////////////
      router.post('/empFilter',async(req,res)=>{
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;
            // const result= await addTransferSchema.find();
            // console.log(result);
            const result = await transferSchema.find({$lookup:{
              from:'department',
              localfield:""
            }})
                                        .limit(limit)
                                        .skip(skip)
                                        .lean();
            const count = await transferSchema.count();
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
    })

    ///////////// 
  //   router.post('/locationfilter',async(req,res)=>{
  //     try {
  //         let {limit , skip} = req.query;
  //         limit = +limit ||10;
  //         skip = +skip ?? 0;
  //         // const result= await addTransferSchema.find();
  //         // console.log(result);
  //         const result = await assetschema.find({location:req.body.filter})
  //                                     .limit(limit)
  //                                     .skip(skip)
  //                                     .lean();
  //                                     console.log(result);
  //         const count = await assetschema.count();
  //         const page = parseInt(req.query.skip) || 0;
  //         res.status(200).json({
  //             "data":result,
  //             "page":page,
  //             "limit":limit,
  //             "totalPages": Math.ceil(count / limit),
  //             "totalResults": count,
  //             "statusCode":200,
  //         })
  //       } catch (error) {
  //         res.status(500).json({ statusCode:500, error: error.message });
  //       }
  // })


})
module.exports = router;