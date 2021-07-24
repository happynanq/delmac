const { Router } = require('express')
const config = require('config')
const User = require('../models/User')
const auth = require("../middleware/auth.middleware.js")

const router = Router()

//! api/get !GET ONE USER
router.post(
  '/user',
  auth,
  async (req, res) => {
    try {
      
      const {userID } = req.body
      const user = await User.findOne({ _id: req.user.userID })
      // const user = await User.findOne({ _id: userID })
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }
      const {password,_id, __v,  ...newUser} = user._doc
      res.json({...newUser})
      
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
  }
)
//! api/get !GET  USERs

router.post(
  '/users',
  async (req, res) => {
    try {

      
      // const {userID } = req.body
      const users = await User.find({ accessLevel : req.body.accessLevel})
      const newUser = users.map((u)=>{
        let {password, ...n}=u._doc
        
        return n
      })
      res.json(newUser)
      // // const user = await User.findOne({ _id: userID })
      
      
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
  }
)
module.exports = router
