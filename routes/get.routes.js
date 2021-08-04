const { Router } = require('express')
const config = require('config')
const User = require('../models/User')
const Driver = require('../models/Driver')

const auth = require("../middleware/auth.middleware.js")

const router = Router()

//! api/get !GET ONE USER
router.post(
  '/user',
  auth,
  async (req, res) => {
    if(!req?.user?.userID){
      return
    }
    try {
      // console.log(req.user.userID)
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
//! api/get/users !GET  USERs

router.post(
  '/people',
  async (req, res) => {
    try {

      let users
      
      // const {userID } = req.body
      if(req.body.accessLevel ==="driver" || req.body.accessLevel === "unconfirmedDriver"){
        users = await Driver.find({ accessLevel : req.body.accessLevel})
      } else if(req.body.accessLevel ==="unconfirmed" || req.body.accessLevel === "confirmed"){
        users = await User.find({ ...req.body})
      } else{
        users = await Driver.find({...req.body})
      }
      const newUser = users.map((u)=>{
        let {password, owner, ...n}=u._doc
        
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
