const jwt = require('jsonwebtoken')
const Users = require('../models/usersModels')

const requireAuth = async (req, res, next) => {
  // verifying user authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1] //getting token that position at 1

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await Users.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth