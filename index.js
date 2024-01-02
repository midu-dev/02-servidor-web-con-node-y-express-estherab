// Ejercicio 1: crear servidor HTTP con Node
const http = require('node:http')
const fs = require('node:fs')

const invalidMethod = (res) => {
  res.statusCode = 405
  return res.end('<h1>405</h1>')
}

function startServer () {
  const PORT = process.env.PORT ?? 1234

  const processRequest = (req, res) => {
    const { method, url } = req
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    switch (url) {
      case '/':
        if (method === 'GET') {
          return res.end('<h1>¡Hola mundo!</h1>')
        }
        else
          return invalidMethod(res)
        
      case '/logo.webp':
        if (method === 'GET') {
          res.setHeader('Content-Type', 'image/webp')
          return res.end(fs.readFileSync('./assets/logo.webp'))
        }
        
        else
          return invalidMethod(res)
          
      case '/contacto': {
        if (method === 'POST') {
          let body = ''

          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            res.statusCode = 201
            res.setHeader('Content-Type', 'application/json; charset=utf-8')

            return res.end(JSON.stringify(data))
          })
        } 
        
        else 
          return invalidMethod(res)
        
        break
      }

      default:
        res.statusCode = 404
        return res.end('<h1>404</h1>')
    }
  }

  const server = http.createServer(processRequest)

  server.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })

  return server
}

module.exports = {
  startServer
}
