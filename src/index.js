const express = require('express')
const app = express()
const port = 3000

// Connection à la base de données
const connect = require('./data/helpers/db')
connect()

// Parmétrage de Express pour le body et le JSON
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// On importe le logger
const logger = require('./middlewares/logger')
// On dit à Express d'utiliser le logger en tant que middleware
app.use(logger)

// On branche notre route users sur le fichier correspondant, le nom index.js est utilisé par défaut.
app.use('/users', require('./routes/users'))

app.get('/', (req, res) => {
  res.send('Hello world Express !')
})

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})