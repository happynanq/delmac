const { Router } = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const { check, validationResult, validator } = require('express-validator')

const User = require('../models/User')
const Driver = require('../models/Driver')
const auth = require('../middleware/auth.middleware.js')
const { findOne } = require('../models/User')
const router = Router()

//! api/change !GET ONE USER
router.post(
  '/user',
  auth,
  [
    check('email', 'Некорректный email').isEmail(),
    check('tel', 'Неверно введён номер телефона').custom((v) => {
      let length = v.match(/\d/g).length
      if (!(length == 11 && v.split('').length === length)) {
        return Promise.reject()
      }
      return Promise.resolve()
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      const { oldPassword, newPassword, ...newBody } = req.body

      if (
        !errors.isEmpty() ||
        (newPassword.length < 6 && newPassword.length !== 0)
      ) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные',
        })
      }
      const { userID: _id } = req.user

      const user = await User.findOne({ _id })

      let b = { ...newBody }

      if (newPassword.length !== 0) {
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
          return res.status(400).json({ message: 'Неверный старый пароль' })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12)
        b.password = hashedPassword
      }
      let newUser
      if (user.accessLevel === 'admin') {
        newUser = await User.findOneAndUpdate(
          { _id },
          { ...b }
        )
      } else {
        newUser = await User.findOneAndUpdate(
          { _id },
          { ...b, accessLevel: 'unconfirmed' }
        )
      }

      newUser.save()
      res.json({ message: 'Пользователь Изменён' })
      // if (!user) {s
      //   return res.status(400).json({ message: 'Пользователь не найден' })
      // }
    } catch (e) {
      console.log('ERROR FROM CHANGE : ', e)
      res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
    }
  }
)

router.post('/people', async (req, res) => {
  try {
    req.body.data.map(async (_id) => {
      if (req.body.accessLevel === 'unconfirmedDriver') {
        let d = await Driver.findOneAndUpdate(
          { _id },
          { accessLevel: 'driver' }
        )
        d.save()
      } else if (req.body.accessLevel === 'unconfirmed') {
        let u = await User.findOneAndUpdate(
          { _id },
          { accessLevel: 'confirmed' }
        )
        // u.save()
      }else if(req.body.accessLevel === 'driver'){
        let u = await Driver.findOneAndUpdate(
          { _id },
          { accessLevel: 'unconfirmedDriver' }
        )

      }
    })

    res.json({ message: 'База отредактирована' })
  } catch (e) {
    console.log('ERROR FROM CHANGE : ', e)
    res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
  }
})

router.post('/password', async (req, res) => {
  try {
    const { _id, pass } = req.body
    console.log(_id)
    
    const user = await User.findOneAndUpdate(
      { _id },
      { password: pass }
    )
    console.log("user", user)
    res.json({ message: 'Пароль успешно изменён' })
  } catch (e) {
    console.log('ERROR FROM CHANGE : ', e)
    res.status(500).json({ message: 'Что то пошло не так, попробуйте снова' })
  }
})

module.exports = router
