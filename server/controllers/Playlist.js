const Playlist = require("../models/playlist");

// Add a new playlist
module.exports.addPlaylist = (req, res) => {
    const { name, items } = req.body;
    const { id: owner } = req.user;

    if (!name)
        return res.status(400).send({ msg: "Playlist name not provided" });

    const newPlaylist = new Playlist({ owner, name, items: items || [] });
    newPlaylist.save().then(savedPlaylist => {
        // if newPlaylist returned is the same as savedPlaylist then saved successfully
        if (savedPlaylist === newPlaylist) {
            return res.status(201).send({ msg: "Playlist created successfully" });
        } else return res.status(500).send({ msg: "Failed to create playlist" });
    });
};

// get playlist by id
module.exports.getPlaylist = async (req, res) => {
    const { id } = req.params;

    if (!id)
        return res.status(400).send({ msg: "Invalid id" });

    Playlist.findById(id, (err, playlist) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: err });
        }

        if (!playlist)
            return res.status(404).send({ msg: "Playlist not found" });

        return res.status(200).send(playlist);
    });
};

// get all playlist by specific owner
module.exports.getPlaylists = async (req, res) => {
    const { id: owner } = req.user;

    let options = { owner };
    if (req.query) {
        const { search } = req.query;
        if (search?.length > 0)
            options = {
                ...options,
                name: {
                    $regex: search,
                    $options: "i"
                }
            };
    }

    Playlist.find(options, (err, playlists) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: err });
        }

        if (!playlists)
            return res.status(200).send([]);
        else return res.status(200).send(playlists);
    });
};

// add item to existing playlist
module.exports.addItemToPlaylist = async  (req, res) => {
    const { playlist_id, song_id } = req.params;

    if (!playlist_id || !song_id)
        return res.status(400).send({ msg: "Invalid params" });

    Playlist.findById(playlist_id, (err, playlist) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ msg: err });
        }

        if (!playlist)
            return res.status(404).send({ msg: "Bad playlist id" });

        if (playlist.items.some(i => i+"" === song_id+""))
            return res.status(409).send({ msg: "Item already in selected playlist" });

        playlist.items.push(song_id);
        Playlist.updateOne({ _id: playlist_id }, { items: playlist.items }).then(result => {
            if (result.modifiedCount === 1 && result.acknowledged)
                return res.status(201).send({ msg: "Successfully added item to playlist" });
            else
                return res.status(500).send({ msg: "Failed to add item to playlist" });
        });
    });
};