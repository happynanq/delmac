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
      console.log("USERID: ", req.user)
      
      const {userID } = req.body
      const user = await User.findOne({ _id: req.user.userID })
      // const user = await User.findOne({ _id: userID })
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }
      res.json({
        name:user.name,
        lastName:user.lastName,
        patronymic:user.patronymic,
        parkName:user.parkName,
        tel:user.tel,
        email:user.email,
        accessLevel:user.accessLevel
      })
      
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
  }
)

module.exports = router
