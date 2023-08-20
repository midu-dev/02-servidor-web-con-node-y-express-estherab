// Ejercicio 2: crear servidor HTTP con Express
const express = require('express')
const fs = require('fs')

const app = express()

const PORT = process.env.PORT ?? 1234
app.disable('x-powered-by')

function startServer () {
  app.use(express.static('./assets'))
  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('<h1>¡Hola mundo!</h1>')
  })

  app.get('/logo.webp', (req, res) => {
    res.end(fs.readFileSync('./assets/logo.webp'))
  })

  app.get('/404', (req, res) => {
    res.status(404).send('<h1>404</h1>')
  })

  app.post('/contacto', (req, res) => {
    res.status(201).json(req.body)
  })

  app.use((req, res) => {
    res.status(405).send('<h1>405</h1>')
  })

  return app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}

module.exports = {
  startServer
}
