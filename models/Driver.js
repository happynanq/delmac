const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name:{type:String},
  lastname:{type:String},
  patronymic:{type:String},
  birthday:{type:Date},
  region:{type:Number},
  

  owner:{type: Types.ObjectId, ref: 'user' }


})

module.exports = model("driver", schema)