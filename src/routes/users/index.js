const { getUsers, createUser, getUserById, updateUserById, deleteUserById } = require('../../controllers/usersController')
const withAuth = require('../../middlewares/auth')
const router = require('express').Router()

router.route('/')

// Récupérer la liste des users
  .get(withAuth, async (req, res) => {
    const users = await getUsers()
    return res.send(users)
  })

// Create user
  .post(async (req, res) => {
    try {
      const userCreated = await createUser(req.body)
      return res.send(userCreated)
    } catch (error) {
      return res.status(500).send(error)
    }
  })

router.route('/:id')
// Récupérer un user en fonction de son id
  .get(async (req, res) => {
    try {
      // On récupère le user en bdd avec son id
      const user = await getUserById(req.params.id)
      return res.send(user)
    } catch (error) {
      return res.status(500).send(error)
    }
  })

// Update User
  .patch(async (req, res) => {
    try {
      const userUpdate = await updateUserById(req.params.id, req.body)
      return res.send(userUpdate)
    } catch (error) {
      return res.status(500).send(error)
    }
  })

// Delete User
  .delete(async (req, res) => {
    try {
      await deleteUserById(req.params.id)

      return res.send(`User with id : ${req._destroyparams.id} as been deleted`)
    } catch (error) {
      return res.status(500).send(error)
    }
  })

module.exports = router
