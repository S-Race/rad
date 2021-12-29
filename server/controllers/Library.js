const services = require("../services");
const MusicLibrary = require("../models/musicLibrary");

// Add the specified path as a music library
module.exports.addLibrary = (req, res) => {
    const path = req.body.path;

    MusicLibrary.find({ path }, (err, lib) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: err });
        }
        if (lib?.length < 1) {
            const newLib = new MusicLibrary({ path });
            newLib.save().then(savedLib => {
                if (savedLib === newLib) { // if savedLib returned is the same as newLib then saved successfully
                    services.scanLibraries();
                    return res.status(201).send({ msg: "Path added to Library successfully" });
                } else return res.status(500).send({ msg: "Failed to add path to library" });
            });
        }
        else return res.status(409).send({ msg: "That path is already tracked" });
    });
};

module.exports.getLibraries = async (_, res) => {
    return res.status(200).send(await services.getLibraryRoots());
};