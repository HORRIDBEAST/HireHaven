const mongoose = require("mongoose");

const UserAnswerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mockIdRef: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    correctAns: {
      type: String,
      required: true,
    },
    userAns: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);

const UserAnswer = mongoose.model("UserAnswer", UserAnswerSchema);

module.exports = UserAnswer;