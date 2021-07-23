const {Schema, model} = require('mongoose')

const schema = new Schema({
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  name:{type:String, required:true},
  lastName:{type:String, required:true},
  patronymic:{type:String, required:true},
  parkName:{type:String, required:true},
  tel:{type:String, required:true},
  accessLevel:{type:String, required:true, default:"uncomfrimed" }


})

module.exports = model("user", schema)