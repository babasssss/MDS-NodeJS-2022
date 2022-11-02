const mongoose = require('mongoose')

const connect = () => {
  mongoose.connect('mongodb+srv://mydigitalschool:mydigitalschool@cluster0.xvks1om.mongodb.net/NodeJS?retryWrites=true&w=majority')
    .then(() => {
      console.log('Database connected')
    })
    .catch((error) => {
      console.error('Error while connecting to database : ' + JSON.stringify(error))
    })
}

module.exports = connect
