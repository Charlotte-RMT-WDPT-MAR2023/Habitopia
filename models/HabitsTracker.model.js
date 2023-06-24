const mongoose = require("mongoose");

//Models for the Habits Tracker since all have different property


const pushUpsHabitSchema = new mongoose.Schema({
 
  numberOf: { type: Number, required: true }
});


const waterHabitSchema = new mongoose.Schema({
 
  liters: { type: Number, required: true }
  
});


const yogaHabitSchema = new mongoose.Schema({
 
  duration: { type: Number, required: true }

});


const pushUps = mongoose.model("Push-Ups", pushUpsHabitSchema)
const water = mongoose.model('Water', waterHabitSchema)
const yoga = mongoose.model("Yoga", yogaHabitSchema);

module.exports = { pushUps, water, yoga};