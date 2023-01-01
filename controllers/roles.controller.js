const { request } = require('express')
const Role = require('../models/role')

const rolesGet = async (req, res) => {

  const { limit = 15, from = 0 } = req.query
  const query = { status: true }

  const [total, roles] = await Promise.all([
    Role.countDocuments(query),
    Role.find(query).skip(Number(from)).limit(Number(limit))
  ])

  res.json({ total, roles })

}

const rolesPost = async (req = request, res) => {

  const { role, status } = req.body

  const roleUp = new Role({ role: role.toUpperCase(), status })
  await roleUp.save()

  res.json(roleUp)

}

const rolesPut = async (req, res) => {

  const { id } = req.params
  const { _id, ...rest } = req.body

  const role = await Role.findByIdAndUpdate(id, rest)

  res.json(role)

}

const rolesDelete = async (req, res) => {

  const { id } = req.params
  const role = await Role.findByIdAndUpdate(id, { status: false })
  res.json(role)

}

module.exports = {
  rolesGet,
  rolesPost,
  rolesPut,
  rolesDelete,
}
