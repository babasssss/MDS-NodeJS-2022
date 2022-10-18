const http = require('http')

// Ancienne méthode
// const server = http.createServer(function (req, res) {
// })

// Nouvelle méthode avec fonction fléchée
const server = http.createServer((req, res) => {
  res.end('Ceci est la réponse de mon serveur')
})

server.listen(3000)
