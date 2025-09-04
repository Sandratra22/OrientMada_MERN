const mongoose = require('mongoose');
const EnrollmentSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  formationId:{type:mongoose.Schema.Types.ObjectId,ref:'Formation'},
  status:{type:String,enum:['draft','submitted','under_review','accepted','rejected'],default:'draft'},
  answers:{}, attachments:[{name:String,url:String,type:String}],
  history:[{at:Date,by:String,status:String,comment:String}]
},{timestamps:true});
module.exports = mongoose.model('Enrollment',EnrollmentSchema);