import React, { useState, useEffect } from "react";

import { useUserContext } from "../UserContext";


const AddPlaylist = ({ headerText="Add to Playlist", finish, item_id }) => {
    const [playlistName, setPlaylistName] = useState("");
    const [playlists, setPlaylists] = useState([]);
    const { user: { token } } = useUserContext();

    useEffect(() => {
        // get list of playlists to provide options to add
        (async () => {
            const res = await fetch("/api/playlists/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (res.status !== 200) {
                alert("A critical error occurred");
                return;
            }

            setPlaylists(await res.json());
        })();
    }, []);

    const addItemToPlaylist = async (id) => {
        // add item to existing playlist
        fetch(`/api/playlist/${id}/${item_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }).then(res => {
            if (res.status !== 201) {
                if (res.status === 409)
                    alert("Item already exists in selected playlist");
                else alert("A critical error occurred");
                return;
            }

            finish();
        });
    };

    const createPlaylist = () => {
        if (playlistName.length < 1) {
            alert("You need to provide a name for the new playlist");
            return;
        }
        // create a new playlist and add item to that playlist
        fetch("/api/playlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: playlistName,
                items: [item_id]
            })
        }).then(res => {
            if (res.status !== 201) {
                alert("A critical error occurred");
                return;
            }

            finish();
        });
    };

    return (
        <div className="bg-gray-800 shadow-xl md:w-2/5 w-11/12 mx-auto md:my-12 my-4 rounded-md content">
            <header className="bg-gray-900 text-gray-100 text-xl flex justify-between mb-4 p-4">
                <span>{ headerText }</span>
                <span
                    className="text-3xl text-gray-500 hover:text-red-500 cursor-pointer"
                    onClick={finish}
                >&times;</span>
            </header>

            <ul className="h-60 overflow-auto">
                { playlists.map((item, i) =>
                    <li key={i} className="flex p-4 hover:bg-gray-500 hover:cursor-pointer"
                        onClick={() => addItemToPlaylist(item._id)}>
                        <img src={item.poster || "https://picsum.photos/100/100?id=" + item.name} alt=" "
                            className="h-12 w-12" />
                        <span className="ml-4 block self-center">{item.name}</span>
                    </li>
                )}
            </ul>

            <footer className="bg-gray-900 text-gray-100 text-xl flex justify-between mb-4 p-4">
                <input type="text" placeholder="playlist1"
                    onChange={(e) => setPlaylistName(e.target.value)} value={playlistName}
                    className="w-3/4 text-gray-900 px-2 outline-none focus:outline-blue-600"/>
                <button className="bg-blue-600 hover:bg-blue-800 px-4 py-2 mx-2 transform active:scale-95 rounded-sm"
                    onClick={createPlaylist}
                > Create
                </button>
            </footer>
        </div>
    );
};

export default AddPlaylist;