const { boolean } = require('joi');
const mongoose = require('mongoose');
const locationSchema = mongoose.Schema({

    parentLocation: {type:String},
    location:{type:String, unique:true},
    locationCode :{type: String, unique: true, sparse: true},
    locationDescription: {type: String},
    inventoryLocation: {type:Boolean, default:false},
    defaultCoordinates: {type: String},
    description: {type: String},
    createdBy: {type: String}
}, {timestamps: true})

module.exports = mongoose.model('Location',locationSchema)