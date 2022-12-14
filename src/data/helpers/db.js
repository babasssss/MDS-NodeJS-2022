const mongoose = require('mongoose')

const connect = () => {
  mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`)
    .then(() => {
      console.log('Database connected')
    })
    .catch((error) => {
      console.error('Error while connecting to database : ' + JSON.stringify(error))
    })
}

module.exports = connect
