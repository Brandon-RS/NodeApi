const { request, response } = require("express")
const bcryptjs = require('bcryptjs')
const User = require("../models/user")


const login = async (req = request, res = response) => {

  const { email, password } = req.body

  try {

    // [x]: verify is email exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        msg: 'User/Password are not correct - email'
      })
    }

    // [x]: is user active?
    if (!user.status) {
      return res.status(400).json({
        msg: 'User/Password are not correct - user inactive'
      })
    }

    // [x]: Check password
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User/Password are not correct - invalid password'
      })
    }

    // [ ]: Generate JWT

    res.json({
      msg: 'Login ok'
    })

  } catch (error) {

    console.log(error)
    return res.status(500).json({
      msg: 'Contact admin'
    })

  }

}

module.exports = {
  login,
}
