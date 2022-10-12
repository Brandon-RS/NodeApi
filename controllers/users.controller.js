const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')

const User = require('../models/user')

const usersGet = (req = request, res = response) => {
  res.json({
    msg: 'Get Users Controller'
  })
}

const usersPost = async (req = request, res = response) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })

  // [ ]: Verify if email exists
  const emailExists = await User.findOne({ email })
  if (emailExists) {
    return res.status(400).json({
      msg: 'Email registered.'
    })
  }

  // [ ]: Encrypt password
  const salt = bcryptjs.genSaltSync(10)
  user.password = bcryptjs.hashSync(password, salt)

  // [x]: Save on DB
  await user.save()

  res.json(user)
}

const usersPut = (req = request, res = response) => {

  const { id } = req.params

  res.json({
    id,
  })
}

const usersPatch = (req = request, res = response) => {
  res.json({
    msg: 'Patch Users Controller'
  })
}

const usersDelete = (req = request, res = response) => {
  res.json({
    msg: 'Delete Users Controller'
  })
}

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
}
