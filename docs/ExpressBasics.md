# Express Basics

To use [Express](https://expressjs.com/) you just need to import the library and create a variable to start the `express()` function, it is very common to use 'app' as the variable name for this.

Then you can use whatever method you need using `app.get()`, `app.put()` or something like that.

In this case, the method we use for send a response is `res.send(something)`, and similarly, we use `res.status(value).send(error_message)` to send a status code.

```js
const express = require('express')
const app = express()

const port = 8080

app.get('/', (req, res) => {
  res.send('Hello world from Express')
})

app.get('/api/users', (req, res) => {
  res.send('Api - Users')
})

app.get('*', (req, res) => {
  res.status(404).send('404 | Page not found! :(')
})

app.listen(port, () => {
  console.log(`Listen on http://127.0.0.1:${port}`)
})
```
