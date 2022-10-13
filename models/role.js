const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'Role is required']
  },
  status: {
    type: Boolean,
    default: true,
  }
})

RoleSchema.methods.toJSON = function () {
  const { __v, ...role } = this.toObject()
  return role
}

module.exports = model('role', RoleSchema)
