require("dotenv").config();
const services = require("../services");

// Get subdirs of root dir
module.exports.getRootDirs = (req, res) => {
    res.status(200).send({
        path: global.HOME,
        dirs: services.lsDir(global.HOME),
        root: true
    });
};

// Get subdirs of given path
module.exports.getDirs = (req, res) => {
    res.status(200).send({
        path: req.body.dir,
        dirs: services.lsDir(req.body.dir),
        root: req.body.dir === global.HOME
    });
};