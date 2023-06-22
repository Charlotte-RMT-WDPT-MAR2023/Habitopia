const { Schema, model } = require("mongoose");

const journalSchema = new Schema({
  content: {
    type: String,
    required: [true, "Content is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Journal", journalSchema);
