const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/validate_fields')
const { validateRole, validateRoleId } = require('../helpers/roles.helpers')
const {
  rolesGet,
  rolesPost,
  rolesPut,
} = require('../controllers/roles.controller')

const router = Router()

router.get('/', rolesGet)

router.post('/', [
  check('role', 'Role is required').not().isEmpty(),
  // check('role').custom(validateRole),
  validateFields,
], rolesPost)

router.put('/:id', [
  check('id', 'Is not a valid id').isMongoId(),
  check('id').custom(validateRoleId),
  check('role', 'Role is required').not().isEmpty(),
  check('role').custom(validateRole),
  validateFields,
], rolesPut)

module.exports = router
