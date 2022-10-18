const express = require('express')
const app = express()
const port = 3000

const connect = require('./data/helpers/db')
connect()

// On importe le logger
const logger = require('./middlewares/logger')
// On dit à Express d'utiliser le logger en tant que middleware
app.use(logger)

app.get('/', (req, res) => {
  res.send('Hello world Express !')
})

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})