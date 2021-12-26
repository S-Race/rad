import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../UserContext";
import { useSearchContext } from "../SearchContext";

import Loader from "../components/Loader";
import PlaylistItem from "../components/PlaylistItem";

const Playlists = () => {
    const [playlistsLoaded, setPlaylistsLoaded] = useState(false);
    const [playlists, setPlaylists] = useState([]);

    const navigate = useNavigate();

    const { user } = useUserContext();
    const { search } = useSearchContext();

    const onItemClick = id => navigate("/playlist/" + id);

    const getResults = async (query) => {
        // will change this cuz the server should kno the user id from the token now
        const res = await fetch("/api/playlists/" + user.id + (query?.length > 1 ? "?search=" + query : ""), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`,
            },
        });

        if (res.status !== 200) {
            alert("A critical error occurred");
            return;
        }

        setPlaylists(await res.json());
        setPlaylistsLoaded(true);
    };

    useEffect(() => getResults(search), [search]);

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