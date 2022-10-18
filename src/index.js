const express = require('express')
const app = express()
const port = 3000

const connect = require('./data/helpers/db')
connect()

const User = require('./data/models/User')

// On importe le logger
const logger = require('./middlewares/logger')
// On dit à Express d'utiliser le logger en tant que middleware
app.use(logger)

app.get('/', (req, res) => {
  res.send('Hello world Express !')
})

app.post('/user', (req, res) => {

  const user = new User({
    firstName: 'Michel',
    lastName: 'Toto',
    phone: '010203040506',
    email: 'michel.toto@mail.com',
    password: 'SuperPassword44'
  })

  user.save()
  .then((result) => console.log(result))
  .catch((error) => console.error(error))

  res.send()

})

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})