const mongoose = require("mongoose");
const validator = require("validator");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter your project title"],
      maxLength: [30, "Your project title cannot exceed 30 characters"],
      minLength: [4, "Your project title should have more than 4 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter your project description"],
      maxLength: [500, "Your project description cannot exceed 500 characters"],
      minLength: [
        50,
        "Your project description should have more than 50 characters",
      ],
    },
    startDate: {
      type: String,
      required: [true, "Please enter your project start date"],
    },
    endDate: {
      type: String,
      required: [true, "Please enter your project end date"],
    },
    githubLink: {
      type: String,
      required: [true, "Please enter your project github link"],
      validate: [validator.isURL, "Please enter valid github link"],
    },
    projectLink: {
      type: String,
      required: [true, "Please enter your project link"],
      validate: [validator.isURL, "Please enter valid project link"],
    },
    technologiesUsed: {
      type: Array,
      required: [true, "Please enter your project technologies"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    projectReport: {
        public_id: {
            type: String,
            default: "report is not uploaded",
            required: true,
        },
        url: {
            type: String,
            default: "report is not uploaded",
            required: true,
        },
        },
    },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
