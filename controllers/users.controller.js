const { request, response } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const usersGet = async (req = request, res = response) => {

  const { limit = 10, from = 0 } = req.query
  const query = { status: true }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({ total, users })
}

const usersPost = async (req = request, res = response) => {

  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })

  // Encrypt password
  const salt = bcryptjs.genSaltSync(10)
  user.password = bcryptjs.hashSync(password, salt)

  // Save on DB
  await user.save()

  res.json(user)
}

const usersPut = async (req = request, res = response) => {

  const { id } = req.params
  const { _id, password, google, ...rest } = req.body

  if (password) {
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, rest)

  res.json(user)
}

const usersPatch = (req = request, res = response) => {
  res.json({
    msg: 'Patch Users Controller'
  })
}

const usersDelete = async (req = request, res = response) => {

  const { id } = req.params

  const user = await User.findByIdAndUpdate(id, { status: false })

  res.json(user)
}

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
}
