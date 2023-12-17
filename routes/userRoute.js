const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer").v2;
const bodyParser = require('body-parser');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    verifyEmail,
  } = require("../controllers/userController");

  const {
    isAuthenticatedUser,
    isAuthenticatedRoles,
  } = require("../middleware/auth");
  const { singleUpload } = require("../middleware/multer");
  const router = express.Router();

router.route("/register").post(bodyParser.urlencoded(),singleUpload, registerUser);
router.route("/verifyemail").post(bodyParser.urlencoded(),verifyEmail);
router.route("/login").post(bodyParser.urlencoded(),loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);


module.exports = router;