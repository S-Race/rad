const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const Song = require("./models/song");
const MusicLibrary = require("./models/musicLibrary");

const canRead = path => {
    // Check read permissions
    try {
        fs.accessSync(path, fs.constants.R_OK);
        return true;
    } catch (err) {
        console.log("error occurred when getting permissions for %s: %s", path, err);
        return false;
    }
};

const canReadExecute = path => {
    // Check read and execute permissions
    try {
        fs.accessSync(path, fs.constants.R_OK);
        fs.accessSync(path, fs.constants.X_OK);
        return true; // made it here ... dir exist and we can read/execute (cd) the dir
    } catch (err) {
        console.log("error occurred when getting permissions for %s: %s", path, err);
        return false;
    }
};

const ls = (dir, exts, deep=true) => {
    let list = [];
    if (!dir || !fs.existsSync(dir))
        return list;

    if (!canReadExecute(dir))
        return list;

    let files = fs.readdirSync(dir);
    files.forEach(file => {
        const filepath = dir + path.sep + file;
        if (fs.lstatSync(filepath).isDirectory() && deep)
            list = list.concat(ls(filepath, exts, deep));
        if (fs.lstatSync(filepath).isFile()) {
            if (canRead(filepath)) { // no point adding it if i cant read from it
                if (exts.includes(path.extname(file).slice(1)))
                    list.push(filepath);
                if (exts.length < 1) // no extensions passed ?, assume all files
                    list.push(filepath);
            }
        }
    });

    return list;
};

const getLibraryRoots = async () => {
    // query the db for the library folders (added by the user)
    const roots = (await MusicLibrary.find({}, { path: 1 }));
    return roots.map(({ path }) => path).filter(i => i); // filter to remove nulls
};

const getAudioDuration = (a) => {
    return new Promise((resolve, reject) => {
        ffmpeg.setFfmpegPath(global.FFMPEG_PATH);
        ffmpeg.setFfprobePath(global.FFPROBE_PATH);
        return ffmpeg.ffprobe(a, (err, metadata) => {
            if (err) return reject(err);

            const { duration } = metadata.streams[0];
            return resolve(duration);
        });
    });
};

module.exports = {
    scanLibraries: async () => {
        let audio = (await getLibraryRoots())
            .map(root => ls(root, ["mp3", "wav", "ogg"], true))
            .reduce((acc, value) => acc.concat(value), []);
        // query the db to return all the audio
        // loop over all the exising audio found from the ls
        // update the db with new audio

        let dbAudio = (await Song.find({}, { name: 1, extension: 1 }))
            .map(({ name, extension }) => name + "." + extension);

        for (let i = 0; i < audio.length; i++) {
            if (!dbAudio.includes(path.basename(audio[i]))) {
                // add new item to the db
                let songObj = {
                    name: path.basename(audio[i]).slice(0, -path.extname(audio[i]).length),
                    location: path.dirname(audio[i]),
                    extension: path.extname(audio[i]).slice(1),
                };
                try {
                    songObj.duration = await getAudioDuration(audio[i]);
                } catch (e) {
                    console.log(e);
                }
                const newSong = new Song(songObj);
                newSong.save(); // this returns a promise
            }
        }
    },
    getLibraryRoots: async () => await getLibraryRoots(),
    anyLibrariesExist: () => getLibraryRoots().length > 0,
    lsDir: dir => {
        let list = [];
        if (!dir || !fs.existsSync(dir))
            return list;

        if (!canReadExecute(dir))
            return list;

        let files = fs.readdirSync(dir);
        files.forEach(file => {
            if (fs.lstatSync(dir + path.sep + file).isDirectory())
                list.push(dir + path.sep + file);
        });

        return list.map(l => l.replace("/\\/g", "/"));
    }
};