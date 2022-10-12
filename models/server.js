const express = require('express')
const cors = require('cors')

class Server {

  constructor() {

    this.app = express()
    this.port = process.env.PORT
    this.usersPath = '/api/users'

    // Middlewares
    this.middlewares()

    // Application routes
    this.routes()

  }

  middlewares() {

    // CORS
    this.app.use(cors())

    // Read and parse of body
    this.app.use(express.json())

    // Public directory
    this.app.use(express.static('public'))
  }

  routes() {

    this.app.use(this.usersPath, require('../routes/users.routes'))

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening in port: ${this.port}`)
    })
  }

}

module.exports = Server
