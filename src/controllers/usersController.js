const User = require('../data/models/User')

const getUsers = async () => {
  const users = await User.find().select('-password')
  return users
}

const createUser = async (user) => {
  // Vérification de la présence d'email ou de password
  if (!user.email || !user.password) {
    throw new Error('missing data')
  }
  const _user = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    password: user.password
  })
  // On enregistre le user et on récup dans MongoDB
  const savedUser = await _user.save()

  // Retirer le password de la route
  const savedUserObject = savedUser.toObject()
  delete savedUserObject.password
  // On renvoit le user dans la réponse de l'API
  return savedUserObject
}

const getUserById = async (id) => {
  if (!id) {
    throw new Error('missing data')
  }
  const user = await User.findById(id).select('-password')
  const userObject = user.toObject()
  return userObject
}

const updateUserById = async (id, user) => {
  if (!id) {
    throw new Error('missing data')
  }
  if (!user) {
    throw new Error('missing user')
  }

  // On met à jour le user via la méthode mongoose findByIdAndUpdate
  const userUpdate = await User.findByIdAndUpdate(id, user, { new: true }).select('-password')

  const userObject = userUpdate.toObject()

  return userObject
}

const deleteUserById = async (id) => {
  if (!id) {
    throw new Error('missing data')
  }
  await User.findByIdAndDelete(id)
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById
}
