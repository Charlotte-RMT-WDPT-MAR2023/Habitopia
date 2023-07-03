const mongoose = require("mongoose");

const pushUpsHabitSchema = new mongoose.Schema({
  numberOf: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required:true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const waterHabitSchema = new mongoose.Schema({
  liters: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required:true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const yogaHabitSchema = new mongoose.Schema({
  minutes: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required:true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const pushUps = mongoose.model("Push-Ups", pushUpsHabitSchema);
const water = mongoose.model('Water', waterHabitSchema);
const yoga = mongoose.model("Yoga", yogaHabitSchema);

module.exports = { pushUps, water, yoga };
