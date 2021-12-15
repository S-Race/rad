require("dotenv").config();
const services = require("../services");
const MusicLibrary = require("../models/musicLibrary");

// Add the specified path as a music library
module.exports.addLibrary = (req, res) => {
    const path = req.body.path;
    const name = req.body.name;

    MusicLibrary.find({ name }, (err, lib) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                msg: err
            });
        }
        if (lib?.length < 1) {
            const newLib = new MusicLibrary({
                name,
                paths: [path]
            });
            newLib.save().then(savedLib => {
                if (savedLib === newLib) // if savedLib returned is the same as newLib then saved successfully
                    res.status(201).send({ msg: "Library created successfully" });
                else res.status(500).send({ msg: "Failed to create new library" });
            });
            services.scanLibraries();
        }
        else res.status(409).send({ msg: "A library with that name already exists" });
    });
};