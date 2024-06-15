const { date, boolean } = require('joi');
const mongoose=require('mongoose');
const addAssetSchema=mongoose.Schema({
    discardCheck:{type:Boolean,default:false},
    assetName:{type:String,Required:true},
    assetImage:{type:String},
    assetimageOriginal:{type:String},
    uploadFilespath:{type:String},
    uploadfilesorginal:{type:String},
    assetCode:{type:String},
    category:{type:String,Required:true},
    location:{type:String,Required:true},
    status:{type:String,Required:true},
    condition:{type:String},
    brand:{type:String},
    model:{type:String},
    linkedAsset:{type:String},
    Description:{type:String},
    serialNo:{type:String},
    vendorName:{type:String},
    poNumber:{type:Number},
    invoiceDate:{type:Date},
    invoiceNo:{type:String},
    purchaseDate:{type:Date},
    purchasePrice:{type:Number},
    selfOwener:{type:Boolean},
    capitalizationPrice:{type:Number},
    endlifeDate:{type:Date},
    capitalizationDate:{type:Date},
    depreciationPercent:{type:Number},
    incomeTax:{type:Number},
    scrapValue:{type:String},
    accumulatedDepression:{type:Number},
    deparment:{type:String},
    transferredTo:{type:String},
    allottedUpto:{type:Date},
    remarks:{type:String},
    amcVendor:{type:String},
    warrantyVendor:{type:String},
    insurancestartdate:{type:Date},
    insuranceenddate:{type:Date},
    amcstartDate:{type:Date},
    amcendDate:{type:Date},
    warantystartDate:{type:Date},
    warantyendDate:{type:Date},
})
module.exports=mongoose.model('addAssetschema',addAssetSchema);