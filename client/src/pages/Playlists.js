import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useOutletContext } from "react-router-dom";

import { useUserContext } from "../UserContext";

import Loader from "../components/Loader";
import PlaylistItem from "../components/PlaylistItem";

const Playlists = () => {
    const [playlistsLoaded, setPlaylistsLoaded] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const { user } = useUserContext();
    const navigate = useNavigate();

    const onItemClick = id => navigate("/playlist/" + id);

    useEffect(() => {
        // get list of playlists to provide options to add
        (async () => {
            const res = await fetch("/api/playlists/" + user.id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status !== 200) {
                alert("A critical error occurred");
                return;
            }

            setPlaylists(await res.json());
            setPlaylistsLoaded(true);
        })();
    }, []);

    return (
        <div className="bg-gray-800 text-gray-100 min-h-screen p-5">
            {
                playlistsLoaded ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        { playlists.map((item, i) =>
                            <div key={i}>
                                <PlaylistItem poster={item.poster || "https://picsum.photos/200/200?id=" + item.name}
                                    name={item.name} id={item._id} click={onItemClick} />
                            </div>)
                        }
                    </div>
                ) : <Loader text="Loading your playlists"/>
            }
        </div>
    );
};

export default Playlists;