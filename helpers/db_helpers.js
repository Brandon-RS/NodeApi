const User = require('../models/user')
const Role = require('../models/role')

const validateRole = async (role) => {
  const existsRole = await Role.findOne({ role })
  if (!existsRole) {
    throw new Error(`Role: ${role}, is invalid`)
  }
}

const validateEmail = async (email = '') => {
  const emailExists = await User.findOne({ email })
  if (emailExists) {
    throw new Error('Email registered')
  }
}

const validateUserId = async (id) => {
  const idExists = await User.findById(id)
  if (!idExists) {
    throw new Error('User not found')
  }
}

module.exports = {
  validateRole,
  validateEmail,
  validateUserId,
}
