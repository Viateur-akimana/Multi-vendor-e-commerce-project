const express = require("express");
const path = require("path");
const router = express.Router();
const upload = require("../multer");
const User = require("../model/user");
const { ErrorHandler } = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonWebToken");
const sendToken = require("../utils/jwtToken");

//this is route for signup
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        res.status(500).json({ message: "the file is not deleted" });
      } else {
        res.json({ message: "the file is deleted successfully" });
      }
    });
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
  const activationToken = createActivationToken(user);
  const activationUrl = `https://localhost/3000/activation/${activationToken}`;
  try {
    await sendMail({
      user: user.mail,
      subject: `Activate your account`,
      message: `Hello,${user.firstname} please activate your account:${activationUrl}`,
    });
    res.status(201).json({
      success: true,
      message: `please check this email:${user.email} to activate your account`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
//creating activation token
const createActivationToken = () => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};
//,activate the user
router.post("/activation", async (req, res, next) => {
  const { activation_token } = req.body;
  const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

  if (!newUser) {
    return next(new ErrorHandler("invalid token", 400));
    const { firstname, email, password, avatar } = newUser;

    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists"));
    }
    User.create({
      firstname,
      email,
      password,
      avatar,
    });
    sendToken(newUser, 201, res);
  }
});

//route for logining in the user
router.post("/login-user", async (req, res, next) => {
  try {
    const { email, passsword } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("please fill all fields", 400));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    const isPasswordValid = await user.comparePassword(passsword);
    if (!isPasswordValid) {
      return next(
        new ErrorHandler("please provide the correct information", 400)
      );
    }
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error.message);
  }
});

//loading the users
router.post("/getusers",isAuthenticated,async(req,res,next)=>{
  try {
    const user = await User.findById(req.user.id);
    if(!user){
      return next(new ErrorHandler("User doesn't exists",400))
    }
    res.status(201).json({
      success:true,
      user
    })
  } catch (error) {
    console.log(error.message);
  }
})
module.exports = router;
