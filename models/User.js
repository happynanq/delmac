const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  name:{type:String, required:true},
  lastName:{type:String, required:true},
  patronymic:{type:String, required:true},
  parkName:{type:String, required:true},
  tel:{type:String, required:true},
  accessLevel:{type:String, required:true, default:"unconfirmed" },
  drivers: [{ type: Types.ObjectId, ref: 'Link' }],
  userLogin:{type:String, required:true}


})

module.exports = model("user", schema)