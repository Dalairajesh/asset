const mongoose = require('mongoose')
const schema = mongoose.Schema

const ticketSchema = mongoose.Schema({
asset:{type: schema.ObjectId, ref:'addAssetschema'},
assetLocation:{type: schema.ObjectId, ref:'Location'},
serviceVendor:{type: schema.ObjectId, ref:'Vendor'},
ticketType:{type: schema.ObjectId, ref:'TicketType'},
ticketGroup:{type: String},
assignee:{type:String},
reportedDate:{type:String},
priority:{type:schema.ObjectId, ref:'Priority'},
filePath:{type:String},
fileName:{type:String},
reportedBy:{type:String},
description:{type:String},
ccEmail:{type:String},
notifyReported:{type:Boolean,default:false}

},{timestamps: true})

module.exports = mongoose.model('CreateTicket',ticketSchema)