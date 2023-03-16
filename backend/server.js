require('dotenv').config()

const { application } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const allRoutes = require('./routes/routes.js')
const usersRoutes = require('./routes/usersRoutes')

//express app
const myFit = express()

//midddleware
myFit.use(express.json())

myFit.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//main route
myFit.use('/api/routes.js', allRoutes)
myFit.use('/api/usersRoutes', usersRoutes)

//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        //port request listening
        myFit.listen(process.env.PORT, () => {
        console.log('database is connected & listening on port:', process.env.PORT)
})
    })
    .catch((error) => {
        console.log(error)
    })
