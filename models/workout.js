const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema (
    {
        day: {
            type: Date,
            default: () => new Date()
        },
        exercises: [
            {
              type: {
                  type: String,
                  trim: true,
                  required: 'Enter a type of exercise'
              },
              name: {
                  type: String,
                  trim: true,
                  required: 'Enter an exercise name'
              },
              duration: {
                  type: Number,
                  required: 'How long did this exercise last?'
              },
              weight: {
                  type: Number
              },
              reps: {
                  type: Number
              },
              sets: {
                  type: Number
              },
              distance: {
                  type: Number
              }
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

workoutSchema.virtual('totalDuration').get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;