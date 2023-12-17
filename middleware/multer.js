const multer = require("multer");

const storage = multer.memoryStorage();

exports.singleUpload = multer({ storage }).single("image");

exports.multiFileUpload = multer({ storage }).fields([
    { name: 'offerLater', maxCount: 1 },
    { name: 'certificate', maxCount: 1 },
  ]);


