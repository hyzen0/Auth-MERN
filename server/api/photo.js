const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/myupload");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("profilepic");

router.post("/", (req, res) => {
  upload(req, res, error => {
    if (error) {
      res.render("index", {
        message: error,
      });
    } else {
      res.render("index", {
        message: "Successfully Uploaded",
        filename: `myupload/${req.file.filename}`,
      });
    }
  });
});

module.exports = router;
