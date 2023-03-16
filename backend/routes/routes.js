//main files for workouts routes.
const express = require('express')
const {
    getAllWorkout,
    getSingleWorkout,
    addWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all workout routes
router.use(requireAuth)

//get all data
router.get('/', getAllWorkout)

//get a single data
router.get('/:id', getSingleWorkout)

//post a new data
router.post('/', addWorkout)

//delete a data
router.delete('/:id', deleteWorkout)

//update a data
router.patch('/:id', updateWorkout)

module.exports = router 