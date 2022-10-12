const { request, response } = require('express')

const usersGet = (req = request, res = response) => {
  res.json({
    msg: 'Get Users Controller'
  })
}

const usersPost = (req = request, res = response) => {
  res.json({
    msg: 'Post Users Controller'
  })
}

const usersPut = (req = request, res = response) => {
  res.json({
    msg: 'Put Users Controller'
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
