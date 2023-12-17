const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer").v2;
const app = express();
const bodyParser = require('body-parser');

const { singleUpload, multiFileUpload } = require("../middleware/multer");

const {
    isAuthenticatedUser,
    isAuthenticatedRoles,
  } = require("../middleware/auth");
const { submitInternship } = require("../controllers/internshipController");

const router = express.Router();

router.route("/submit-internship-details").post(bodyParser.urlencoded(),multiFileUpload, submitInternship);


module.exports = router;