
const isAdminRole = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'Your need to verify the token access first'
    })
  }
  const { role, name } = req.user
  if (role !== 'ADMIN') {
    return res.status(401).json({
      msg: `${name} isn't ADMIN`
    })
  }
  next()
}

const hasRole = (...roles) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(500).json({
        msg: 'Your need to verify the token access first'
      })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `You need to login as: ${roles}`
      })
    }

    next()
  }
}


module.exports = {
  isAdminRole,
  hasRole,
}
