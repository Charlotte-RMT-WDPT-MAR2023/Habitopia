const mongoose = require("mongoose");

//Models for the Habits Tracker since all have different property

const pushUpsHabitSchema = new mongoose.Schema({
 
  numberOf: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



const waterHabitSchema = new mongoose.Schema({

  liters: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

 


const yogaHabitSchema = new mongoose.Schema({

 minutes: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const pushUps = mongoose.model("Push-Ups", pushUpsHabitSchema)
const water = mongoose.model('Water', waterHabitSchema)
const yoga = mongoose.model("Yoga", yogaHabitSchema);

module.exports = { pushUps, water, yoga};