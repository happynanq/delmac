const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')
const sendMail = require('../helpers/sendMail')
const auth = require("../middleware/auth.middleware.js")

const router = Router()

//api/auth
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('email', 'Введите ваш логин').exists(),
    check('tel', 'Неверно введён номер телефона').custom((v) => {
      try {
        let length = v?.match(/\d/g).length
        if (!(length == 11 && v.split('').length === length)) {
          return Promise.reject()
        }
        return Promise.resolve()
      } catch (e) {
        return Promise.reject()
      }
    }),
    check('password', 'Минимальная длина пароля - 6 символов').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        console.log('ERRORS HERE - AUTH REGISTER : ')
        return res.status(400).json({
          errors: errors.array(),
          message: 'неверные данные логина',
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
      const user = new User({ ...req.body, password: hashedPassword })

      await user.save()
      res.status(201).json({ message: 'Пользователь создан' })
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Что то пошло не так, попробуйте снова', e })
    }
  }
)

//! api/auth !LOGIN
router.post(
  '/login',
  [
    check('userLogin', 'Введите корректный логин').exists(),
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
      const { userLogin, password } = req.body

      const user = await User.findOne({ userLogin })
      if (!user) {
        return res.status(400).json({ message: 'Неверно введены данные' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Неверно введены данные' })
      }
      const token = jwt.sign({ userID: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h',
      })
      res.json({ token, userID: user.id, accessLevel: user.accessLevel })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
  }
)

router.post('/changePassword', [], async (req, res) => {
  try {
    let { email, login, password, link } = req.body
    let user

    if (login) {
      user = await User.findOne({ userLogin:login })
    } else {
      user = await User.findOne({ email })

    }
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Такого пользователя не существует' })
    }
    // let toHash = await bcrypt.hash(user.userLogin, 5) 
    // console.log(toHash)
    const newPassword = await bcrypt.hash(password, 12)
    sendMail(email,login, link, newPassword, user._id)

    res.json({ message: 'Сообщение отправленно!' })
    // res.json({ token, userID: user.id, accessLevel: user.accessLevel })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
  }
})

router.post('/jwtSign', [
  auth
], async (req, res) => {
  try {
    let jwt = req.user
    let user

    
    // if (!user) {
    //   return res
    //     .status(400)
    //     .json({ message: 'Такого пользователя не существует' })
    // }
    // // let toHash = await bcrypt.hash(user.userLogin, 5) 
    // // console.log(toHash)
    // const newPassword = await bcrypt.hash(password, 12)
    // sendMail(email,login, link, newPassword, user._id)

    res.json({ message: 'jwt sign!' })
    // res.json({ token, userID: user.id, accessLevel: user.accessLevel })
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
  }
})

module.exports = router
