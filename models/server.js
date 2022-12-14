const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../db/config')

class Server {

  constructor() {

    this.app = express()
    this.port = process.env.PORT
    this.usersPath = '/api/users'
    this.rolesPath = '/api/roles'
    this.authPath = '/api/auth'

    // Connect to BB
    this.connectDB()

    // Middlewares
    this.middlewares()

    // Application routes
    this.routes()

  }

  async connectDB() {
    await dbConnection()
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

    this.app.use(this.usersPath, require('../routes/user.routes'))
    this.app.use(this.rolesPath, require('../routes/role.routes'))
    this.app.use(this.authPath, require('../routes/auth.routes'))

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening in port: ${this.port}`)
    })
  }

}

module.exports = Server
