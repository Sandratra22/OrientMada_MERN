const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
  threadKey:String,
  fromUserId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  toUserId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  body:String, attachments:[{name:String,url:String,type:String}], readAt:Date
},{timestamps:true});
module.exports = mongoose.model('Message',MessageSchema);