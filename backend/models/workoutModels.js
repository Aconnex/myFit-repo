const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lbs: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true   //is required is missing properties will be saved even if left unanswered
    },
    notes: {
        type: String,
        required: false
    },
    //assigning workout to their user
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Workout', workoutSchema)

