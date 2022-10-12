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

### Server Config

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

> **Note:** To use a status code just need use `res.status(value)` method: eg.

```js
this.app.get("/api", (req, res) => {
  res.status(404).json({
    msg: "404 | Not found :(",
  });
});
```

### App Routes

You can keep all your routes inside the `rotues()` method as in the previous example, but this can grow very large, and if this happens, it will be very difficult to read and mantain the code. The solution to this issue is to use the `Route` object of _**express**_.

To do this, just create a folder named **_routes_** and a file named somethig like _test.route.js_, the name does'nt really matter, and put your routes inside it, like in the example below:

```js
const { Router, request, response } = require("express");

const router = Router();

// Use req = request, res = response is redundant, it is for educational purposes only.
router.get("/", (req = request, res = response) => {
  res.json({
    msg: "Get API Controller",
  });
});

module.exports = router;
```

On the other hand, in the _server.js_ file, inside the `routes()` method you need to use a middleware for use this routes.

```js
this.usersPath = '/api/users'

routes() {
  this.app.use(this.usersPath, require('../routes/user.routes'))
}
```

Then, maybe you will separate your logic of inside the get, post, put, and others functions, and to do this, create a folder named _**controllers**_ or something like that, and inside a file for your functions, in this case, we'll use as example:

```js
const { request, response } = require("express");

const usersGet = (req = request, res = response) => {
  res.json({
    msg: "Get Users Controller",
  });
};

module.exports = {
  usersGet,
};
```

And in your route, just need do:

```js
router.get("/", usersGet);
```
