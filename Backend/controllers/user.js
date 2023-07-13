const express = require("express");
const path = require("path");
const router = express.Router();
const upload = require("../multer");
const User = require("../model/user");
const { ErrorHandler } = require("../utils/ErrorHandler");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return next(new ErrorHandler("the user already exists", 400));
  }
  const filename = req.file.filename;
  const fileurl = path.join(filename);

  const user = {
    name: name,
    email: email,
    password: password,
    avatar: fileurl,
  };
});

module.exports = router;
