const mongoose=require('mongoose');

const discardschema=mongoose.Schema({
    assetInfo:{
      type:mongoose.Schema.ObjectId,
      ref:"addAssetschema"
    },
    soldValue:{type:Number},
    wdv:{type:Number},
    reason:{type:String,Requied:true},
    discardate:{type:Date,Requied:true},
    vendorname:{type:String},
    remark:{type:String},
    taxGroup:{type:String},
    uploadfile:{type:String},
    originalfile:{type:String},
})

module.exports=mongoose.model('discardschema',discardschema);