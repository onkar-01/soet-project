const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");
const { getDataUri } = require("../utils/datauri");
const cloudinary = require("cloudinary").v2;
const Project = require("../models/projectModel");
// to submit a project

exports.submitProject = catchAsyncErrors(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorHander("Please enter all fields", 400));
  }
  console.log(req.body);
  const {
    title,
    description,
    startDate,
    endDate,
    githubLink,
    projectLink,
    technologiesUsed,
  } = req.body;
  const report = req.file;
  if (!report) {
    return next(new ErrorHander("Please upload a report", 400));
  }
  const reportUri = getDataUri(report);
  const result = await cloudinary.uploader.upload(reportUri.content, {
    folder: "KRMU",
    resource_type: "raw",
  });

  const reportUrl = result.secure_url;

  const project = await Project.create({
    title: title,
    description: description,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    githubLink: githubLink,
    projectLink: projectLink,
    technologiesUsed: technologiesUsed,
    projectReport: {
      public_id: result.public_id,
      url: reportUrl,
    },
  });

  return res.json({
    message: "Project submitted successfully",
    project: project,
  });
});


// to get all projects

exports.getAllProjects = catchAsyncErrors(async (req, res, next) => {
    const projects = await Project.find();
    
    return res.json({
        projects: projects,
    });
});

// to get a single project

exports.getSingleProject = catchAsyncErrors(async (req, res, next) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        return next(new ErrorHander("Project not found", 404));
    }
    return res.json({
        project: project,
    });
});

// to update a project

exports.updateProject = catchAsyncErrors(async (req, res, next) => {
    if (!req.body) {
        return next(new ErrorHander("Please enter all fields", 400));
    }
    const {
        title,
        description,
        startDate,
        endDate,
        githubLink,
        projectLink,
        technologiesUsed,
    } = req.body;
    const report = req.file;
    const project = await Project.findById(req.params.id);
    if (!project) {
        return next(new ErrorHander("Project not found", 404));
    }
    if (report) {
        const reportUri = getDataUri(report);
        const result = await cloudinary.uploader.upload(reportUri.content, {
            folder: "KRMU",
            resource_type: "raw",
        });
        const reportUrl = result.secure_url;
        project.projectReport = {
            public_id: result.public_id,
            url: reportUrl,
        };
    }
    project.title = title;
    project.description = description;
    project.startDate = new Date(startDate);
    project.endDate = new Date(endDate);
    project.githubLink = githubLink;
    project.projectLink = projectLink;
    project.technologiesUsed = technologiesUsed;
    await project.save();
    return res.json({
        message: "Project updated successfully",
        project: project,
    });
});

exports.vefifyProject = catchAsyncErrors(async (req, res, next) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        return next(new ErrorHander("Project not found", 404));
    }
    project.isVerified = true;
    await project.save();
    return res.json({
        message: "Project verified successfully",
        project: project,
    });
});
// delete a project

exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
    const project = await Project.findById(req.params.id);
    cloudinary.uploader.destroy(project.projectReport.public_id);
    if (!project) {
        return next(new ErrorHander("Project not found", 404));
    }
    await project.remove();
    return res.json({
        message: "Project deleted successfully",
    });
});
