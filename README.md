# NodeApi

Basic API example, a little practice to understand how GET, POST, PUT, and DELETE methods works.

## Getting Started

This API exsample uses [Node.js](https://nodejs.org/en/) as a backend framework and [Express](https://expressjs.com/) library to build a Rest-API, you can see the oficial documentation for know how these work.

The DataBase manager used for this example is [MongoDB](https://www.mongodb.com/), running in localhost.

## Basic commands

Use: <br/>

- `npm install` or `npm i` to load the required libraries.
- `npm i library_name` to install an specific library.
- `npm start` to launch the app. _For this works, you must declare the "start" script in the package.json file._
- `node file_name.js` to launch an specific file. 

# Creating a basic API step by step.

## Vanilla HTPP Server

To create a vanilla HTTP server with node, first need to use HTTP object from Node, then call to `createServer` method with some attributes and variables that you need.

```js
const http = require("http");

const hostname = "127.0.0.1";
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "text/plain");
  res.write("Hello world!");
  res.end("End server");
});

server.listen(port, hostname, () => {
  console.log(`Server listening at http://${hostname}:${port}`);
});
```

## Express Basics

To use [Express](https://expressjs.com/) you just need to import the library and create a variable to start the `express()` function, it is very common to use 'app' as the variable name for this.

Then you can use whatever method you need using `app.get()`, `app.put()` or something like that.

In this case, the method we use for send a response is `res.send(something)`, and similarly, we use `res.status(value).send(error_message)` to send a status code.

```js
const express = require("express");
const app = express();

const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello world from Express");
});

app.get("/api/users", (req, res) => {
  res.send("Api - Users");
});

app.get("*", (req, res) => {
  res.status(404).send("404 | Page not found! :(");
});

app.listen(port, () => {
  console.log(`Listen on http://127.0.0.1:${port}`);
});
```

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
└───middlewares
│   │   validate_fields.js
│
└───helpers
│   │   db_helpers.js
│
└───db
│   │   config.js
│
└───controllers
    │   users.controller.js
```

On the other hand, this project uses the [dotenv](https://www.npmjs.com/package/dotenv) library for environment variables, and to use it, you just need create a file named _.env_ in the root of the project as you can see in the tree, and put all environment variables that you need inside it.

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

You can keep all your routes inside the `rotues()` method as in the previous example, but this can grow very large, and if this happens, it will be very difficult to read and maintain the code. The solution to this issue is to use the `Route` object of _**express**_.

To do this, just create a folder named **_routes_** and a file named something like _test.route.js_, the name doesn't really matter, and put your routes inside it, like in the example below:

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

On the other hand, in the _server.js_ file, inside the `routes()` method you need to use a middle-ware for use this routes.

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

### Receive Info

To receive information from a POST, PUT, DELETE or other method, just need to access the _request_ object in its _body_ parameter, and if you want to receive the information in JSON format, you need to use a middle-ware like this:

```js
  middlewares() {
    // Read and parse of body
    this.app.use(express.json())
  }
```

#### Parameters

To receive a parameter from the URL, use _**:param_name**_ after your route, like this:

```js
router.put("/:id", usersPut);
```

And in your PUT function just access to `request.params` variable, or if you want to receive some query parameters, use `request.query`.

## Mongoose

### Connecting to MongoDB

To connect with [MongoDB](https://www.mongodb.com/) is required to use an ODM (Object Data Modeling) like [mongoose](https://mongoosejs.com/) which is the one we'll use in this example.

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

For validate some fields we gonna use [express-validator](https://www.npmjs.com/package/express-validator). To use it, you need to send a middle-ware in the route that you need, and is important to know that the first argument of the method is the route name, but in the second argument if you don't want to use a middle-ware put the function with your logic, but if you need to use a middle-ware put it as the second argument, and your logic in the third argument, like this:

```js
// Without middlewares (express-validator)
router.post("/", usersPost);

// With express-validator middleware
router.post("/", [
    // middlewares
    check("email", "Invalid email").isEmail(),
    check("role", "It is not an allowed role").isIn(["ADMIN_ROLE", "USER_ROLE"]),
  ],  usersPost
);
```

This middle-ware only prepare the errors, but not show it, to show all the errors, in your petition function do this:

```js
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json(errors);
}
```

To decentralize the validations from a specific request and be able to reuse them in another route, you just have to create a file and move the above code into a function, and then call that function as a middle-ware from the route middle-wares, in this example a folder called "middlewares" is created for this.

```js
const { validationResult } = require("express-validator");
const User = require("../models/user");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

module.exports = {
  validateFields,
};
```

It is to important call `next()` function, don't forget to call it.
In the same way, if you want create a custom validation, you can do it like this:

In `helpers/db_helpers.js` file:

```js
const validateEmail = async (email = "") => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error("Email registered");
  }
};

module.exports = {
  validateEmail,
};
```

For use its in your route, only need to call it.

```js
router.post(
  "/",
  [
    // ...
    check("email").custom((value) => validateEmail(value)),
    // Or only this
    check("email").custom(validateEmail),
    validateFields,
  ],
  usersPost
);
```

To validate the role against the DB, you need to create a "role".

```js
const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, "Role is required"],
  },
});

module.exports = model("role", RoleSchema);
```

And for validate the role you can do something like this:

In `helpers/db_helpers.js`

```js
const validateRole = async (role) => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`Role: ${role}, is invalid`);
  }
};
```

In `routes/users.route.js`:

```js
router.post(
  "/",
  [
    // ...
    check("role").custom(validateRole),
    // ...
  ],
  usersPost
);
```

### Customize JSON response

In the user schema, just need to do:

```js
UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};
```
