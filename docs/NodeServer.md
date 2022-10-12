# Vanilla HTPP Server

To create a vanilla http server with node, first need to use http object from Node, then call to `createServer` method with some atributes and variables that you need.

```js
const http = require('http')

const hostname = '127.0.0.1'
const port = 8080

const server = http.createServer((req, res) => {

  res.statusCode = 200
  res.setHeader('Content-type', 'text/plain')
  res.write('Hello world!')
  res.end('End server')

})

server.listen(port, hostname, () => {
  console.log(`Server listening at http://${hostname}:${port}`)
})

```
