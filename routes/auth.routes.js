const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validate_fields");

const router = Router()

router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Passwors is required').not().isEmpty(),
  validateFields
], login)

module.exports = router
