const mongoose = require('mongoose');
const StaffMember= mongoose.Schema({
    name:{type:String},
    role:{type:String}
})
module.exports = mongoose.model('myLearning',StaffMember);