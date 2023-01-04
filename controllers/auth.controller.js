const { request, response } = require("express")
const bcryptjs = require('bcryptjs')

const User = require("../models/user")
const { generateToken } = require("../helpers/token.helpers")

const login = async (req = request, res = response) => {

  const { email, password } = req.body

  try {

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        msg: 'User / Password incorrect - email'
      })
    }

    if (!user.status) {
      return res.status(400).json({
        msg: 'User / Password incorrect - inactive user'
      })
    }

    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User / Password incorrect - invalid password'
      })
    }

    const token = await generateToken(user._id)

    res.json({
      user,
      token
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Contact to your admin'
    })
  }

}

module.exports = {
  login,
}
