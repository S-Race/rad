const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const os = require("os");

// environment variables configuration
require("dotenv").config();

global.env = process.env.NODE_ENV || "development";
global.TOKEN_SECRET = process.env.TOKEN_SECRET;
global.HOME = os.homedir();
global.FFMPEG_PATH = process.env.FFMPEG_PATH;
global.FFPROBE_PATH = process.env.FFPROBE_PATH;

// Server routes
const authRouter = require("./routes/auth");
const lsRouter = require("./routes/ls");
const libraryRouter = require("./routes/library");
const deckRouter = require("./routes/deck");
const audioRouter = require("./routes/audio");
const libraryItemsRouter = require("./routes/libraries");
const playlistsRouter = require("./routes/playlists");
const playlistRouter = require("./routes/playlist");
const songRouter = require("./routes/song");

const app = express();

// app.use(morganLogger);
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("client/build"));
app.use("/", express.static(global.env === "development" ? "static" : "server/static"));

// Middleware to verify the jwt
const jwt = require("express-jwt");

// protected all routes behind jwt, except routes used to login and get token
app.use(
    jwt({
        secret: global.TOKEN_SECRET,
        algorithms: ["HS256"],
        getToken: (req) => {
            if (req.headers.authorization?.split(" ")[0] === "Bearer")
                return req.headers.authorization.split(" ")[1];
            else if (req.query?.token)
                return req.query.token;
            else return null;
        }
    }).unless((req) => req.originalUrl.includes("/api/auth"))
);

app.use("/api/auth", authRouter);
app.use("/api/ls", lsRouter);
app.use("/api/library", libraryRouter);
app.use("/api/deck", deckRouter);
app.use("/api/audio", audioRouter);
app.use("/api/libraryItems", libraryItemsRouter);
app.use("/api/playlists", playlistsRouter);
app.use("/api/playlist", playlistRouter);
app.use("/api/song", songRouter);

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

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = val => {
    let port = parseInt(val, 10);

    // named pipe
    if (isNaN(port)) return val;

    // port number
    if (port >= 0) return port;
    return false;
};

/**
 * Event listener for HTTP server "error" event.
 */
const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }

    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const debug = require("debug")("server:server");

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
    let addr = server.address();
    let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
    const services = require("./services");
    services.scanLibraries();
};

// Get port from environment (or 5000) and store in Express.
const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

// Create HTTP server.
const http = require("http");
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);

// try to connect to mongo
// if successful allow the server to start accepting requests
// else log the error and terminate
const DB_URL = "mongodb://" + process.env.DB_HOST + "/" + process.env.DB_NAME;
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
}).then(() => server.listen(port)).catch(e => {
    console.log(e);
});