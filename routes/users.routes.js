const { Router, request, response } = require('express')
const { check } = require('express-validator')

const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require('../controllers/users.controller')
const { validateFields } = require('../middlewares/validate_fields')
const {
  validateEmail,
  validateRole,
  validateUserId
} = require('../helpers/db_helpers')

const router = Router()

router.get('/', usersGet)

router.post('/', [
  check('name', 'Name required').not().isEmpty(),
  check('email', 'Invalid email').isEmail(),
  check('email').custom(validateEmail),
  check('password', 'Password must be 6 characters or more').isLength({ min: 6 }),
  check('role').custom(validateRole),
  validateFields,
], usersPost)

router.put('/:id', [
  check('id', 'Is not a valid id').isMongoId(),
  check('id').custom(validateUserId),
  check('role').custom(validateRole),
  validateFields,
], usersPut)

router.patch('/', usersPatch)

router.delete('/:id', [
  check('id', 'Is not a valid id').isMongoId(),
  check('id').custom(validateUserId),
  validateFields,
], usersDelete)

module.exports = router
