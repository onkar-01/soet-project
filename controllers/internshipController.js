const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");
const { getDataUri } = require("../utils/datauri");
const cloudinary = require("cloudinary").v2;
const Project = require("../models/projectModel");
const Internship = require("../models/internshipModel");

// to submit a intership details

exports.submitInternship = catchAsyncErrors(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorHander("Please enter all fields", 400));
  }

  const {
    title,
    companyName,
    location,
    locationType,
    startDate,
    endDate,
    industry,
    description,
    stipend,
    applyBy,
    skills,
  } = req.body;
  console.log(req.body);
  console.log(req.files);
  const offerLetterFile = req.files["offerLater"][0];
  if (!offerLetterFile) {
    return next(new ErrorHander("Please upload a offer letter", 400));
  }
  const offerLetterUri = getDataUri(offerLetterFile);
  const result1 = await cloudinary.uploader.upload(offerLetterUri.content, {
    folder: "KRMU/internship/offerLetter",
    resource_type: "raw",
  });

  
  let result2; // Result for the certificate file
    const certificateFiles = req.files && req.files["certificate"];
    if (certificateFiles && certificateFiles.length > 0) {
    const certificateFile = certificateFiles[0];
    const certificateUri = getDataUri(certificateFile);
    result2 = await cloudinary.uploader.upload(certificateUri.content, {
        folder: "KRMU/internship/certificate",
        resource_type: "raw",
    });
    }

  console.log(result2);

  const internship = await Internship.create({
    title: title,
    companyName: companyName,
    location: location,
    locationType: locationType,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    industry: industry,
    description: description,
    stipend: stipend,
    applyBy: new Date(applyBy),
    skills: skills,
    offerLetter: {
      public_id: result1.public_id,
      url: result1.secure_url,
    },
    internshipCertificate: {
      public_id:result2 && result2.public_id,
      url: result2 && result2.secure_url,
    },
  });

  return res.json({
    message: "Internship submitted successfully",
    internship: internship,
  });
});


// to get all internships

exports.getAllInternships = catchAsyncErrors(async (req, res, next) => {
    const internships = await Internship.find();
    
    return res.json({
        internships: internships,
    });
});


// to get a single internship

exports.getInternship = catchAsyncErrors(async (req, res, next) => {
    const internship = await Internship.findById(req.params.id);
    
    if (!internship) {
        return next(new ErrorHander("Internship not found", 404));
    }
    
    return res.json({
        internship: internship,
    });
    });


// to delete an internship

exports.deleteInternship = catchAsyncErrors(async (req, res, next) => {
    const internship = await Internship.findById(req.params.id);
    
    if (!internship) {
        return next(new ErrorHander("Internship not found", 404));
    }
    cloudinary.uploader.destroy(internship.offerLetter.public_id);
    internship.internshipCertificate && cloudinary.uploader.destroy(internship.internshipCertificate.public_id);
    await internship.remove();
    
    return res.json({
        message: "Internship deleted successfully",
    });
    
})



