const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async (req = request, res = response, next) => {

  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: 'There is no an access token'
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY)
    const user = await User.findById(uid)

    if (!user) {
      return res.status(401).json({
        msg: 'Invalid token - user not registered'
      })
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'Invalid token - user status: false'
      })
    }

    req.user = user

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: 'Invalid Token'
    })
  }

}

module.exports = {
  validateJWT,
}
