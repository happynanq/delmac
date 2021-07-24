const { Router } = require('express')
const config = require('config')
const User = require('../models/User')
const auth = require("../middleware/auth.middleware.js")
const Driver = require('../models/Driver')
const router = Router()

//TODO: /create - сделать вместо 2ух запросов на user 1 
//! api/get !GET ONE driver
router.post(
  '/create',
  auth,
  async (req, res) => {
    try {
      console.log("userID: ", req.user.userID)
      const user = await User.findOne({_id:req.user.userID})
      const driver = new Driver({name:"TEST", owner:req.user.userID})
      const newUser = await User.findOneAndUpdate({_id:req.user.userID}, {drivers:[ ...user.drivers ,driver._id]} ) 
      console.log("DREIVERID: ", driver._id)
      console.log("USER: ", user.drivers)
      driver.save()
      newUser.save()
      console.log("driver saved: ", driver)
      console.log("user saved: ", newUser)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
  }
)
module.exports = router
