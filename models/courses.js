const mongoose = require("mongoose");
const slug = require("slugify");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide the title for this course"],
  },
  description: {
    type: String,
    required: [true, "Please add a description for this course"],
  },
  weeks: {
    type: String,
    required: [true, "Please add number of weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Please add a tuition cost"],
  },
  minimalSkill: {
    type: String,
    enum: ["Beginner", "intermediate", "advanced"],
  },
  scholarShipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    date: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

module.exports = mongoose.model("course", CourseSchema);
