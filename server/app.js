const createError = require("http-errors");
const express = require("express");

global.env = "development"; // process.env.NODE_ENV || "development";

//Server routes
const userRouter = require("./routes/user");

var app = express();

// app.use(morganLogger);
app.use(express.json());
app.use(express.static("client/build"));

app.use("/api/rss", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;