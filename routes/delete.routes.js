const { Router } = require('express')
const config = require('config')
const User = require('../models/User')
const Driver = require('../models/Driver')
const router = Router()

router.post(
  '/people',
  async (req, res) => {
    try {
      const {_id, accessLevel} = req.body
      if(accessLevel =="unconfirmed"){
        let u = await User.findOneAndDelete({_id})
      }else{
        let d = await Driver.findOneAndDelete({_id}) 
      }
      res.json({message:"Удалён!"})
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
  }
)
module.exports = router
