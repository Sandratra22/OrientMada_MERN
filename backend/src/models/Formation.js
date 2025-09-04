const mongoose = require('mongoose');
const FormationSchema = new mongoose.Schema({
  universityId:{type:mongoose.Schema.Types.ObjectId,ref:'University'},
  title:String, domain:String, level:String, duration:String, fees:Number,
  mode:{type:String,enum:['onsite','online','hybrid'],default:'onsite'},
  prerequisites:String, sessions:[{startDate:Date,endDate:Date}],
  published:{type:Boolean,default:false}
},{timestamps:true});
module.exports = mongoose.model('Formation',FormationSchema);