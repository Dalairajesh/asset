const mongoose=require('mongoose');

const scheduleSchema=mongoose.Schema({
    assetInfo:{
        type:mongoose.Schema.ObjectId,
        ref:"addAssetschema"
    },
    assetName:{type:String},
    location:{type:String,Required:true},
    serviceVendor:{type:String},
    activity:{type:String,Required:true},
    description:{type:String},
    userGroup:{type:String,Required:true},
    attachFile:{type:String},
    originalFile:{type:String},
    assignee:{type:String,Required:true},
    occurs:{type:String,Required:true},
    startDate:{type:Date,Required:true},
    activityReminder:{type:Date,Required:true},
    endDate:{type:Date},
    sendEmailTo:{type:String},
    vendorName:{type:String}
})

module.exports=mongoose.model('assetSchedule',scheduleSchema);