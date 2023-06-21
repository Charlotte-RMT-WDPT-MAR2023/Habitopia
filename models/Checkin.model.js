const { Schema, model } = require("mongoose");

const checkinSchema = new Schema({
  mood: {
    type: Number,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Checkin", checkinSchema);
