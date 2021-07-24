const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

//api/auth
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('tel', 'Неверно введён номер телефона').custom(v=>{
      
      let length = v.match(/\d/g).length
      if( !(length == 11 && v.split("").length === length) ){
        return Promise.reject()
      }
      return Promise.resolve()
    }),
    check('password', 'Минимальная длина пароля - 6 символов').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        console.log("ERRORS HERE 33")
        return res.status(400).json({
          errors: errors.array(),
          message: 'некорректные данные при регистрации',
        })
      }

      const { email, password } = req.body
      const candidate = await User.findOne({ email })
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'такой пользователь уже существует' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ ...req.body , password: hashedPassword })

      await user.save()
      res.status(201).json({ message: 'Пользователь создан' })
    } catch (e) {
      res.status(500).json({ message: 'Что то пошло не так, попробуйте снова', e })
    }
  }
)

//! api/auth !LOGIN
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'некорректные данные при входе в систему',
        })
      }
      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch){
        return res.status(400).json({message:"Неверный пароль"})
      }
      const token = jwt.sign(
        {userID:user.id},
        config.get('jwtSecret'),
        {expiresIn:'1h'}
        
      )
      res.json({token, userID : user.id})


    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
  }
)

module.exports = router
