
const mongoose = require("mongoose");
const addTranferschema = mongoose.Schema({
  
  assetInfo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'addAssetschema'
  },
  user:{type:String,default:'rajesh'},
  newlocation: { type: String, Required: true },
  tansferStatus: { type: String, Required: true },
  allotedupto: { type: Date },
  transferto: { type: String },
  transferCC: [{ type: String }],
  remark: { type: String },
  condition: { type: String },
  uploadfile: { type: String },

});
module.exports = mongoose.model("assetTransferschema", addTranferschema);
