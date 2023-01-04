const Role = require('../models/role')

const validateRole = async (role) => {
  const existsRole = await Role.findOne({ role: role.toUpperCase(), status: true })

  if (existsRole) {
    throw new Error(`Role: ${role.toUpperCase()}, is registered`)
  }
}

const validateRoleId = async (id) => {
  const existsRoleId = await Role.findById(id)

  if (!existsRoleId) {
    throw new Error('Role not found')
  }
}

module.exports = {
  validateRole,
  validateRoleId,
}