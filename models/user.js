const mongoose = require("mongoose");

const userShema  = new mongoose.Schema({
name: {
  type:String,
  required:true,
  trim: true,
},
email:{
  type:String,
  required:true,
  unique:true,
  trim:true,
},
password:{
  type:String,
  required:true,
}
},{
  timestamps:true
});


const User = mongoose.model("User",userShema);

module.exports =User;

