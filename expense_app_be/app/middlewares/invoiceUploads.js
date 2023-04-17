const multer = require("multer");
const path = require("path");
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const pdfUpload = multer({
  storage: Storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype == "application/pdf") {
      callback(null, true);
    } else {
      //console.log({ errors: "only pdf file supported" });
      callback(null, false);
    }
  },
});
module.exports = pdfUpload;
