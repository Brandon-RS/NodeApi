# Rest Server

This project is build using a class-based architecture.

## Project Structure

The project has _app.js_ as its main file, and then there are some folders and files that contain the rest of the project.

```
project
│   app.js
│   .env
│   package.json
│   README.md
│
└───routes
│   │   users.routes.js
│
└───public
│   │   index.html
│   │   404.html
│
└───models
│   │   server.js
│
└───db
│   │   config.js
│
└───controllers
    │   users.controller.js

```

On the other hand, this project uses the [dotenv](https://www.npmjs.com/package/dotenv) library for evironment variables, and to use it, you just need create a file named _.env_ in the root of the project as you can see in the tree, and put all environment variables that you need inside it.

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

### Recieve Info

To recieve information from a POST, PUT, DELTE or other method, just need to access the _request_ object in its _body_ parameter, and if you want to recieve the information in JSON format, you need to use a middleware like this:

```js
  middlewares() {
    // Read and parse of body
    this.app.use(express.json())
  }
```

#### Parameters

To recieve a parameter from the URL, use _**:param_name**_ after your route, like this:

```js
router.put("/:id", usersPut);
```

And in your PUT function just access to `request.params` variable, or if you want to recieve some query parameters, use `request.query`.

## Mongoose

### Connecting to MongoDB

To connect with [MongoDB](https://www.mongodb.com/) is required to use an ODM(Object Data Modeling) like [mongoose](https://mongoosejs.com/) which is the one we'll use in this example.

The folder named _**db**_ contain a _**cofig.js**_ file, that is for the DB connection, the code looks like this:

```js
const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error at launch DB");
  }
};

module.exports = {
  dbConnection,
};
```

> **Note:** MONGODB_CNN variable looks like `MONGODB_CNN=mongodb://localhost:27017/dbname` in the **.env** file.

In the _**server.js**_ file only need call to `dbConnection()` method like this:

```js
const { dbConnection } = require("../db/config");

class Server {
  constructor() {
    // Rest of code ...
    this.connectDB();
  }

  async connectDB() {
    await dbConnection();
  }
}
```

### Creating Schemas

To create a Schema with Mongoose, create a file named _**user.sj**_ in the **models** folder, and put all the code you need, here is a basic example:

```js
const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  role: {
    type: String,
    required: [true, "Role is required."],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("User", UserSchema);
```

For more see the [mongoose](https://mongoosejs.com/docs/) oficial documentation.

> **Note:** the first parameter of `model()` function is the name of your db collection, if you put "User", the collection name will be "Users" in plural.

To use the Schema import it, and create an object of this. Mongoose provide some functions for work with MongoDB, eg. if you want to save an object just need to use `await object.save()`, as in the example below:

```js
const User = require("../models/user");

const usersPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });
  await user.save();
  res.json(user);
};
```

### Encrypting password

The password never gonna be save without encrypt it, and for do this you can use some libraries. In this example we gonna use [bcrypjs](https://www.npmjs.com/package/bcryptjs), and to use it do the following:

```js
const bcryptjs = require("bcryptjs");

const salt = bcryptjs.genSaltSync(10);
user.password = bcryptjs.hashSync(password, salt);
```

### Validations

For validate some fields we gonna use [express-validator](https://www.npmjs.com/package/express-validator). To use it, you need to send a middleware in the route that you need, and is important to know that the first argument of the method is the route name, but in the second argument if you don't want to use a middleware put the function with your logic, but if you need to use a middleware put it as the second argument, and your logic in the thirt argument, like this:

```js
// Without middlewares (express-validator)
router.post("/", usersPost);

// With express-validator middleware
router.post(
  "/",
  [
    // middlewares
    check("email", "Invalid email").isEmail(),
  ],
  usersPost
);
```

This middleware only prepare the errors, but not show it, to show all the errors, in your petition function do this:

```js
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json(errors);
}
```
