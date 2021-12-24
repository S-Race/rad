import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

import "../styles/audio_item.css";

import Loader from "../components/Loader";
import PlaylistListItem from "../components/PlaylistListItem";

const Playlists = () => {
    const [playlistLoaded, setPlaylistLoaded] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const { playlist_id } = useParams();
    const onItemClick = useOutletContext();

    const onItemClickPlay = index => {
        onItemClick({
            name: playlist.name,
            items: playlist.items.map(i => { return { track: i }; })
        }, index);
    };

    useEffect(() => {
        // get the items in the playlist
        (async () => {
            const res = await fetch("/api/playlist/" + playlist_id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status !== 200) {
                alert("A critical error occurred");
                return;
            }

            setPlaylist(await res.json());
            setPlaylistLoaded(true);
        })();
    }, []);

    return (
        <div className="bg-gray-800 text-gray-100 min-h-screen p-4 md:py-5 md:px-16">
            {
                playlistLoaded ? (
                    <div>
                        <div className="flex md:my-12 my-4">
                            <div className="audio_item !bg-transparent relative w-28 md:w-48 flex-shrink-0">
                                <img src={playlist.poster || "https://picsum.photos/200/200?id=" + playlist.name}
                                    alt=" " className="h-28 w-28 md:h-48 md:w-48 rounded-lg"/>
                                <div className="h-28 w-28 md:h-48 md:w-48 absolute top-0 left-0 z-[1]
                                    border-2 rounded-lg hidden fade playFade border-solid border-blue-500
                                    justify-center items-center">
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12 block hover:text-blue-500 cursor-pointer"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1
                                                1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <h2 className="text-lg md:text-3xl font-semibold mx-10 pt-5 truncate
                                md:whitespace-normal">{playlist.name}</h2>
                        </div>
                        <div className="flex my-2 justify-between">
                            <span>{playlist.items.length + " item" + (playlist.items.length !== 1 ? "s" : "")}</span>
                            <span>- min</span>
                        </div>
                        <div className="flex flex-col">
                            { playlist.items.map((item, i) =>
                                <PlaylistListItem id={item} key={i}
                                    index={i} click={onItemClickPlay}/>
                            )}
                        </div>
                    </div>
                ) : <Loader text="Loading playlist"/>
            }
        </div>
    );
};

export default Playlists;