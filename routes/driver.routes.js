const { Router } = require('express')
const config = require('config')
const User = require('../models/User')
const auth = require("../middleware/auth.middleware.js")
const Driver = require('../models/Driver')
const router = Router()

//TODO: /create - сделать вместо 2ух запросов на user 1 
//! api/driver !GET ONE driver
router.post(
  '/create',
  auth,
  async (req, res) => {
    try {
      const user = await User.findOne({_id:req.user.userID})
      let body = req.body
      const driver = new Driver({...req.body, owner:req.user.userID, parkName:user.parkName, allCredit: Number(body.fineСredit) + Number(body.accidentСredit) + Number(body.leaseСredit) + Number(body.otherСredit)})
      const newUser = await User.findOneAndUpdate({_id:req.user.userID}, {drivers:[ ...user.drivers ,driver._id]} ) 
      
      driver.save()
      newUser.save()
      res.json({message:"Видетель добавлен"})
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
  }
)
module.exports = router
