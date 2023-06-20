const { Schema, model } = require("mongoose");

const journalSchema = new Schema(
  {
    title: {
      type: String,
      trim: true
    },
    content: {
      type: String,
      required: [true, "Content is required."]
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = model("Journal", journalSchema);
