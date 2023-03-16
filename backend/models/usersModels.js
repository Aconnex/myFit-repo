const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    /*username: {
        type: String,
        required: false,
        unique: true
    },*/
    password: {
        type: String,
        required: true,
        unique: true //can also be false because user can have the same password
    }
})

//static signup method to save use info to the database
userSchema.statics.aSignupUser = async function(email, password) {
    //signup validation usuing validator package
    if (!email || !password) {
        throw Error('fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('email not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('password not strong enough')
    }


    const ifEmailExist = await this.findOne({ email })
    if (ifEmailExist) {
        throw Error('email is already in use')
    }

    const salt = await bcrypt.genSalt(10) //10 is the default value
    const hash = await bcrypt.hash(password, salt)

    const users =  await this.create({ email, password: hash})  //password encryption using bcrypt package

    return users
}

//static login method
userSchema.statics.aloginUser = async function(email, password) {
    if (!email || !password) {
        throw Error('fields must be filled')
    }

    const ifUserExist = await this.findOne({ email })
    if (!ifUserExist) {
        throw Error('The email does not exist.')
    }

    const userMatch = await bcrypt.compare(password, ifUserExist.password)
    if (!userMatch) {
        throw Error('Incorrect password.')
    }
    return ifUserExist
}

module.exports = mongoose.model('Users', userSchema)