//main files for workouts controller.

const Workout = require('../models/workoutModels')
const mongoose = require('mongoose')

//get all data function
const getAllWorkout = async (req, res) => {
    
    //getting workout for specific user
    const user_id = req.user._id

    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//get a single data function
const getSingleWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No workout is found!'})
    }

    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({error: 'No workout is found!'})
    }
    res.status(200).json(workout)
}

//post a new data function
const addWorkout = async (req, res) => {
    const {name, lbs, sets, notes} = req.body

    //to send message if user enter wrong info
    let falseAnswers = []
    if(!name) {
        falseAnswers.push('name')
    }
    if(!lbs) {
        falseAnswers.push('lbs')
    }
    if(!sets) {
        falseAnswers.push('sets')
    }
    if(falseAnswers.length > 0) {
        return res.status(400).json({error: 'please fill in all fields', falseAnswers})
    }

    try {
        const user_id = req.user._id
        const workout = await Workout.create({name, lbs, sets, notes, user_id})
        res.status(200).json(workout)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    } 
}

//delete a data function
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No workout is found!'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})
    if (!workout) {
        return res.status(404).json({error: 'No workout is found!'})
    }
    res.status(200).json(workout)
}

//update a data function
const updateWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No workout is found!'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body   //use to updat different properties 
    })

    if (!workout) {
        return res.status(400).json({error: 'No workout is found!'})
    }
    res.status(200).json(workout)
}

module.exports = {
    getAllWorkout,
    getSingleWorkout,
    addWorkout,
    deleteWorkout,
    updateWorkout
}