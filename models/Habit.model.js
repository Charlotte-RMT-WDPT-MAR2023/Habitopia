const { Schema, model } = require("mongoose");

const habitSchema = new Schema(
  {
    habit: {
      type: String,
      required: [true, "Habit is required."],
      trim: true
    },
    goal: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: "daily"
    },
    occurrences: [{
        date: {
          type: Date,
          required: true
        },
        details: {
          type: Number,
          trim: true
        }
      }],

  }
);

module.exports = model("Habit", habitSchema);
