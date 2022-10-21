const User = require('../../data/models/User')

const router = require('express').Router()

router.route('/')
.get(async (req, res) => {
  const users = await User.find().select('-password')
  return res.send(users)
})
// Create a user
.post(async (req, res) => {

  // Récupération des paramètres de la requête
  const user = req.body
  // Vérification de la présence de l'email et du password
  if (!user.email || !user.password) {
    // Si il manque une donnée, on renvoit une erreur 400 (Bad Request)
    return res.status(400).send('Missing data')
  }

  try {
    // Si les paramètres sont OK, on continue
    const _user = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      password: user.password
    })
    // On enregistre l'utilisateur et on récupère la donnée créée dans MongoDB
    const savedUser = await _user.save()
    // On transforme le résultat en objet
    let savedUserObject = savedUser.toObject()
    // On retire le password de l'objet renvoyé
    delete savedUserObject.password
    // On renvoit l'utilisateur dans la réponse de l'API
    return res.send(savedUserObject)
  } catch (error) {
    // En cas d'erreur, on renvoit une erreur 500 + le détail dans la réponse
    return res.status(500).send(error)
  }
})

module.exports = router
