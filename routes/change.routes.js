const { Router } = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')

const { check, validationResult, validator } = require('express-validator')

const User = require('../models/User')
const router = Router()


//! api/change !GET ONE USER
router.post(
  '/user',
  [
    check('email', 'Некорректный email').isEmail(),
    check('tel', 'Неверно введён номер телефона').custom(v=>{
      
      let length = v.match(/\d/g).length
      console.log("check11: ",length == 11 && v.split("").length === length)
      if( !(length == 11 && v.split("").length === length) ){
        console.log("REJECTED")
        return Promise.reject()
      }
      return Promise.resolve()
    }),

    
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      const {oldPassword, newPassword, ...newBody } = req.body

      if (!errors.isEmpty() || newPassword.length < 6 && newPassword.length !== 0 ) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные',
        })
      }
      const {_id } = req.body
      console.log("BODY: ", req.body)
      console.log("NEWBODY: ", newBody)
      console.log("oldPassword: ", oldPassword)
      
      const user = await User.findOne({ _id } )

      let b = {...newBody}

      if(newPassword.length !== 0){
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        console.log("isPass?????? ZXCZXCZXC 1000-7?? ", isMatch)
        if(!isMatch){
          return res.status(400).json({message:"Неверный старый пароль"})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12)
        b.password = hashedPassword
      }
      
      const newUser = await User.findOneAndUpdate({ _id }, b )
      newUser.save()
      console.log("CHANGE USER: ", newUser)
      res.json({message:"Пользователь Изменён"})
      // if (!user) {s
      //   return res.status(400).json({ message: 'Пользователь не найден' })
      // }
      
      
    } catch (e) {
      console.log("ERROR FROM CHANGE : ", e)
      res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
  }
)

module.exports = router
