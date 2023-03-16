const express = require('express')

//controller function import
const {loginUser, signupUser} = require('../controllers/userController')

const router = express.Router()

//login route
router.post('/userLogin', loginUser)

//signup route
router.post('/userSignup', signupUser)

module.exports = router