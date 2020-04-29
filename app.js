var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var skillsData = require("./modules/skillsData.json");
var employersRouter = require("./routes/employers/index");
var candidatesRouter = require("./routes/candidates/index");
var Skill = require("./models/skills");
//dotenv
require("dotenv").config();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//connect to database
mongoose.connect(
  "mongodb://localhost/cap12-jobs",
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    console.log(err ? err : "db connected ");
    if (!err) {
      var skillsArray = skillsData.skills.map(s => {
        return { name: s };
      });
      Skill.find({}, (err, findSkills) => {
        if (err) return console.log(err);
        if (findSkills.length === 0) {
          Skill.insertMany(skillsArray, (error, skills) => {
            if (error) return console.log(error);
            console.log(skills);
          });
        }
      });
    }
  }
);

app.use("/api/v1/employers", employersRouter);
app.use("/api/v1/candidates", candidatesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
