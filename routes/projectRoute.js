const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer").v2;
const app = express();
const bodyParser = require('body-parser');

const { singleUpload } = require("../middleware/multer");
const {
    isAuthenticatedUser,
    isAuthenticatedRoles,
  } = require("../middleware/auth");
const { submitProject, getAllProjects, getSingleProject, deleteProject, updateProject, vefifyProject } = require("../controllers/projectController");
  const router = express.Router();

router.route("/submit-project").post(bodyParser.urlencoded(),singleUpload, submitProject);
router.route("/get-all-projects").get(getAllProjects);
router.route("/get-project/:id").get(getSingleProject);
router.route("/delete-project/:id").delete(isAuthenticatedUser,deleteProject);
router.route("/update-project/:id").put(isAuthenticatedUser,updateProject);
router.route("vefiy-project/:id").put(isAuthenticatedUser,vefifyProject);

module.exports = router;