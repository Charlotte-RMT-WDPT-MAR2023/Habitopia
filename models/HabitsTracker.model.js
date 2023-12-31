const mongoose = require("mongoose");

const pushUpsHabitSchema = new mongoose.Schema({
  numberOf: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const waterHabitSchema = new mongoose.Schema({
  liters: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const yogaHabitSchema = new mongoose.Schema({
  minutes: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const pushUps = mongoose.model("Push-Ups", pushUpsHabitSchema);
const water = mongoose.model("Water", waterHabitSchema);
const yoga = mongoose.model("Yoga", yogaHabitSchema);

module.exports = { pushUps, water, yoga };
