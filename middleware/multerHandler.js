const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Define the path where uploaded files will be stored
const uploadFolder = "uploads/";

// Check if the uploads folder exists, create it if it doesn't
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true }); // recursive: true ensures all parent directories are created if needed
}

// Configure multer to store files in the 'uploads/' folder and rename them
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); // Save files in the 'uploads/' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename to avoid conflicts
  },
});

// Set up Multer middleware with limits to restrict file uploads
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Max file size of 10MB (optional)
    files: 10, // Limit to a maximum of 10 files
  },
}).array("images", 10); // The second argument is the maximum number of files allowed

// Export the middleware for use in routes
module.exports = upload;
