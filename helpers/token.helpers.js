const jwt = require('jsonwebtoken')

const generateToken = (uid) => {

  return new Promise((resolve, reject) => {

    const payload = { uid }

    jwt.sign(payload, process.env.SECRETKEY, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject(`We can't generate an access token`)
      } else {
        resolve(token)
      }
    })

  })

}

module.exports = {
  generateToken,
}
