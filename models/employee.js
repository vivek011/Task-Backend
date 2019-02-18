const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Employee = new Schema({
  empId:{type:String},
	name:{type:String,default:''},
	dob:{type:String},
	salary:{type:String},
	skills:{type:Object},
	profilePic:{type:String}
});


module.exports = mongoose.model('Employee',Employee);
