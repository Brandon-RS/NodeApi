const { Router, request, response } = require('express')
const { check } = require('express-validator')

const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require('../controllers/users.controller')

const router = Router()

router.get('/', usersGet)

router.post('/', [
  check('email', 'Invalid email').isEmail(),
], usersPost)

router.put('/:id', usersPut)

router.patch('/', usersPatch)

router.delete('/', usersDelete)

module.exports = router
