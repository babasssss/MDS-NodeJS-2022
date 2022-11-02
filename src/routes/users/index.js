const User = require('../../data/models/User')

const router = require('express').Router()

// http://<url>/users/<id>
router.route('/:id')
  .get(async (req, res) => {
  // On récupère les paramètres
    const params = req.params

    if (!params.id) {
      return res.status(400).send('Missing ID')
    }

    try {
    // On récupère l'utilisateur dans la base de données
      const user = await User.findById(params.id).select('-password')

      const userObject = user.toObject()

      return res.send(userObject)
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  })
  .patch(async (req, res) => {
    // On récupère les paramètres
    const params = req.params
    const user = req.body

    // On vérifie la présence de l'ID dans l'URL
    if (!params.id) {
      return res.status(400).send('Missing ID')
    }
    // On vérifie la présence d'un body dans la requpête (la donnée à mettre à jour)
    if (!user) {
      return res.status(400).send('Missing user')
    }

    try {
      // On met à jour l'utilisateur via la méthode mongoose findByIdAndUpdate
      const userUpdated = await User.findByIdAndUpdate(params.id, user, { new: true }).select('-password')

      const userObject = userUpdated.toObject()

      return res.send(userObject)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })
  .delete(async (req, res) => {
    // On récupère les paramètres
    const params = req.params

    // On vérifie la présence de l'ID dans l'URL
    if (!params.id) {
      return res.status(400).send('Missing ID')
    }

    try {
      await User.findByIdAndDelete(params.id)
      return res.send(`User with ID ${params.id} as been deleted`)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

// http://<url>/users
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
      const savedUserObject = savedUser.toObject()
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
