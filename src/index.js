const express = require('express')
const app = express()

const cors = require('cors')
const server = require('http').Server(app)

const router = require('./network/routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router(app)

server.listen(3001, () => {
  console.log(`La app esta escuchando en: 'http://localhost:3001')`)
})