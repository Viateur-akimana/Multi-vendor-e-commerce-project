const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler');
const app= express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/",express.static("uploads"))
app.use(
    cors(
    origin:"http://localhost:3000",
    credentials:true
));
app.use(bodyParser.urlencoded({extended:true}));

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:"backend/config/.env"
    })
}
//importing the rooutes
const user= require("./controllers/user")
app.use("api/v2",user);
//handling errors
app.use(ErrorHandler);
module.exports = app;