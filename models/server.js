const express = require('express')

class Server {

  constructor() {

    this.app = express()
    this.port = process.env.PORT

    this.middlewares()

    this.routes()

  }

  middlewares() {
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.get('/api', (req, res) => {
      res.json({
        msg: 'Hello from Express'
      })
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening in port: ${this.port}`)
    })
  }

}

module.exports = Server
