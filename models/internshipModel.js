const mongoose = require("mongoose");
const validator = require("validator");

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter your internship title"],
      maxLength: [100, "Your internship title cannot exceed 30 characters"],
      minLength: [
        4,
        "Your internship title should have more than 4 characters",
      ],
    },
    companyName: {
      type: String,
      required: [true, "Please enter your company name"],
      maxLength: [100, "Your company name cannot exceed 30 characters"],
      minLength: [4, "Your company name should have more than 4 characters"],
    },
    location: {
      type: String,
      required: [true, "Please enter your internship location"],
      maxLength: [100, "Your internship location cannot exceed 30 characters"],
      minLength: [
        4,
        "Your internship location should have more than 4 characters",
      ],
    },
    locationType: {
      type: String,
      required: [true, "Please enter your internship location type"],
      maxLength: [
        100,
        "Your internship location type cannot exceed 30 characters",
      ],
      minLength: [
        4,
        "Your internship location type should have more than 4 characters",
      ],
    },
    startDate: {
      type: String,
      required: [true, "Please enter your internship start date"],
    },
    endDate: {
      type: String,
      required: [true, "Please enter your internship end date"],
    },
    industry: {
      type: String,
      required: [true, "Please enter your internship industry"],
      maxLength: [100, "Your internship industry cannot exceed 30 characters"],
      minLength: [
        4,
        "Your internship industry should have more than 4 characters",
      ],
    },
    description: {
      type: String,
      required: [true, "Please enter your internship description"],
      maxLength: [
        500,
        "Your internship description cannot exceed 500 characters",
      ],
      minLength: [
        50,
        "Your internship description should have more than 50 characters",
      ],
    },
    stipend: {
      type: String,
      required: [true, "Please enter your internship stipend"],
      maxLength: [100, "Your internship stipend cannot exceed 30 characters"],
      minLength: [
        4,
        "Your internship stipend should have more than 4 characters",
      ],
    },
    applyBy: {
      type: String,
      required: [true, "Please enter your internship apply by date"],
    },
    skills: {
      type: Array,
      required: [true, "Please enter your internship skills"],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    offerLetter: {
      public_id: {
        type: String,
        default: "Offer letter is not uploaded",
        required: true,
      },
      url: {
        type: String,
        default: "Offer letter is not uploaded",
        required: true,
      },
    },

    internshipCertificate: {
      public_id: {
        type: String,
        default: "Certificate is not uploaded",
        required: true,
      },
      url: {
        type: String,
        default: "Certificate is not uploaded",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Internship", internshipSchema);
