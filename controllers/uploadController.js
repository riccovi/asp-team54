// Import multer for file uploading
const multer = require('multer');

// Define the max file size in bytes (these are 500 Megabytes)
const MAX_FILE_SIZE = 1024 * 1024 * 500; 

// Set up disk storage with multer
const storage = multer.diskStorage({
  // Destination for storing uploaded files
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  // Creating filename for uploaded file
  filename: function(req, file, cb) {
    const date = new Date().toISOString().replace(/:/g, '-');
    cb(null, `${date}-${file.originalname}`);
  }
});

// Set up multer upload
const upload = multer({
  storage: storage,
  // Restrict upload size
  limits: { fileSize: MAX_FILE_SIZE },
  // Filter for allowed file types
  fileFilter: (req, file, cb) => {
    // Only allow JPEG or PNG files
    const isAccepted = file.mimetype === 'image/jpeg' || file.mimetype === 'image/png';
    // Accept or decline the file upload
    cb(null, isAccepted);
  }
});

// Middleware to handle file validation
// Middleware to handle file validation
function handleFileValidation(req, res, next) {
  // Only apply validation if a file is included in the request
  if (req.file) {
    // Check if the file type is valid
    const isAccepted = req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png';

    if (!isAccepted) {
      // If the file type is not valid, create an error
      const err = new Error('Invalid file type. Only JPEG and PNG are allowed!');
      err.statusCode = 400; // Bad request
      return next(err); // Pass the error to the next middleware (your error middleware)
    }
  }

  // If the file is valid, move to the next middleware or route handler
  next();
}


// Export upload wrapper for a single file upload
module.exports.uploadSingle = fieldName => [upload.single(fieldName), handleFileValidation]; 
