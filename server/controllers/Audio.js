const Song = require("../models/song");
const fs = require("fs");
const path = require("path");

module.exports.getAudio = (req, res) => {
    Song.findById(req.params.id, (err, audio) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                msg: err
            });
        }
        if (!audio)
            return res.status(404).send({ msg: "Audio not found" });

        const filename = audio.location + path.sep + audio.name + "." + audio.extension;
        console.log(filename);
        if (!fs.existsSync(filename))
            return res.status(404).send({ msg: "Audio missing from disk" });

        stream(res, filename, req.headers.range || 0);
    });
};

const MIME = {
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg"
};

const stream = (res, filename, range) => {
    const CHUNK_SIZE = (2 ** 20) * 8; // 8MB
    const fileSize = fs.statSync(filename).size;

    // Parse Range
    // Example: "bytes=32794-"
    const start = range instanceof String || typeof range === "string" ? Number(range.replace(/\D/g, "")) : range;
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

    // Create headers
    console.log(MIME);
    console.log(path.extname(filename));
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": MIME[path.extname(filename).slice(1)],
    };

    res.writeHead(206, headers);
    const audioStream = fs.createReadStream(filename, { start, end });

    // Stream the audio chunk to the client
    audioStream.pipe(res);
};