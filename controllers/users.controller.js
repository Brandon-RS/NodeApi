const { request, response } = require('express')

const usersGet = (req = request, res = response) => {
  res.json({
    msg: 'Get Users Controller'
  })
}

const usersPost = (req = request, res = response) => {

  const { name, edad } = req.body

  res.json({
    name,
    edad,
  })
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
