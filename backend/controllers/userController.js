//user schema
const Users = require('../models/usersModels')

const jwt = require('jsonwebtoken')

const createTokens = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'})
}

//login user function
const loginUser =  async (req, res) => {
    const {email, password} = req.body
    try {
        const users = await Users.aloginUser(email, password)

        //token creation
        const token = createTokens(users._id)

        res.status(200).json({email, token})
    }catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup user function
const signupUser =  async (req, res) => {
    const {email, password} = req.body
    try {
        const users = await Users.aSignupUser(email, password)

        //token creation
        const token = createTokens(users._id)

        res.status(200).json({email, token})
    }catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser, signupUser}