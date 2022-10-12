# Rest Server

This project is build using a class-based architecture.

## Project Structure

The project has _app.js_ as its main file, and then there are some folders and files that contain the rest of the project. On the other hand, this project uses the [dotenv](https://www.npmjs.com/package/dotenv) library for evironment variables, and to use it, you just need create a file named _.env_ in the root of the project as you can see in the tree, and put all environment variables that you need inside it.

```
project
│   app.js
│   .env
│   package.json
│   README.md
│
└───public
│   │   index.html
│   │   404.html
│
└───models
    │   server.js
    │   others
```

Then, for use it only need:

```js
// To configure dotenv
require("dotenv").config();

// To use it

const var_name = process.env.ENV_VARIABLE_NAME;
```

## Code explanation

### app.js

The _app.js_ file contains only the _dotenv_ config and the initialization of the Server object with the listen method.

```js
require("dotenv").config();

const Server = require("./models/server");

const server = new Server();
server.listen();
```

### models/server.js

The _server.js_ file contains all the server configuration, but to get started you only need this sample code:

```js
const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/api", (req, res) => {
      res.json({
        msg: "Hello from Express",
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening in port: ${this.port}`);
    });
  }
}

module.exports = Server;
```
