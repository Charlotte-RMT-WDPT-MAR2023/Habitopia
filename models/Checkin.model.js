const { Schema, model } = require("mongoose");

const checkinSchema = new Schema({
  mood: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Checkin", checkinSchema);
