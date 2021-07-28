const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  //!личные данные

  name:{type:String},
  lastName:{type:String},
  patronymic:{type:String},
  birthday:{type:Date},
  entryDate:{type:Date, default:Date.now()},
  owner:{type: Types.ObjectId, ref: 'user' },
  parkName:{type:String, required:true},
  // ownerName:{type:String, required:true},
  //!Долг
  accidentСredit:{type:Number, default:0},
  fineСredit:{type:Number, default:0},
  leaseСredit:{type:Number, default:0},
  otherСredit:{type:Number, default:0},
  allCredit: {type:Number, default:0},
  describe:{type:String},

  //! бизнес данные 
  accessLevel:{type:String, required:true, default:"unconfirmedDriver" },
  


})

module.exports = model("driver", schema)