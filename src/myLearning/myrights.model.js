const mongoose = require('mongoose');
const StaffMember= mongoose.Schema({
    staff_id:{type:mongoose.Schema.Types.ObjectId,ref:"myLearning"},
    right:{type:String}
})
module.exports = mongoose.model('mylearningRights',StaffMember);