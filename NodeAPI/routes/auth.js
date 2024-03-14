const express = require('express')
const sendMail = require('../services/mailService')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const MailTemplate = require('../templates/mailTemplate')
const router = express.Router()
const User = require('../models/user')

const userValidationRules = require('../validations/userValidation')
const validateUser = require('../middleware/validateUser')
const getUser = require('../middleware/getUsers')

require('dotenv').config()

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', userValidationRules(), validateUser, async (req, res) => {
  try {
    console.log('salam')
    const { username, password, firstname, lastname, email } = req.body
    const user = new User({ username, password, firstname, lastname, email })
    await user.save()

    const template = new MailTemplate(firstname, lastname, password)
    //   sendMail(email, 'Hoşgeldiniz', null, template.getTemplate('register'))

    res.status(201).send({
      message: 'Pervin derse geç geldi',
      content: user,
      status: 200,
    })
  } catch (err) {
    res.status(400).send({
      message: err.message,
      content: err,
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    console.log('salam')
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({
        message: 'Kullanıcı adı veya şifre hatalı',
        content: null,
      })
    }

    const tokenOptions = {
      expiresIn: '1d', // s saniye, m dakika, h saat, d gün
      // notBefore: '15s', // 15 saniye sonra başlar
      // audience: 'http://localhost:3000', // token hangi sunucuda kullanılacak
      // issuer: 'http://localhost:5001', // token kimin tarafından veriliyor
      // jwtid: 'CodeAcademyTokenId', // token id
      // subject: 'nodejs dersleri için üretilen token, pervinden icaze almadan servisler çalışmaz', // token hangi konuda
      // algorithm: 'HS256' // token hangi algoritmayla şifrelenecek
    }

    const token = jwt.sign(
      {
        userId: user._id, //,
        // role: 'admin',
        // manager: 'pervin',
        // movzu: 'node.js',
        // date: 'eski date',
        // group:'RADFE203'
      },
      process.env.SECRET_KEY,
      tokenOptions
    )
    res.status(200).send({
      message: 'Giriş başarılı',
      content: { token },
    })
  } catch (err) {
    res.status(400).send({
      message: err.message,
      content: err,
    })
  }
})

router.get('/:id', getUser, async (req, res) => {
  console.log(res.user)
  res.send(res.user)
  // res.json(res.user._id)
})

router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.deleteOne()
    res.json(res.user._id)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.patch('/:id', getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username
  }
  if (req.body.firstname != null) {
    res.user.firstname = req.body.firstname
  }
  if (req.body.lastname != null) {
    res.user.lastname = req.body.lastname
  }
  if (req.body.password != null) {
    res.user.password = req.body.password
  }
  if (req.body.email != null) {
    res.user.email = req.body.email
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({
      message: err.message,
    })
  }
})

module.exports = router
