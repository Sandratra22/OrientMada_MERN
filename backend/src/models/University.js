const mongoose = require('mongoose');
const UniversitySchema = new mongoose.Schema({
  name:String, city:String, description:String, website:String,
  contacts:{email:String,phone:String},
  logoUrl:String, isVerified:{type:Boolean,default:false},
  ownerUserId:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{timestamps:true});
module.exports = mongoose.model('University',UniversitySchema);