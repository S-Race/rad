import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

import "../styles/audio_item.css";

import Loader from "../components/Loader";
import PlaylistListItem from "../components/PlaylistListItem";
import Modal from "../components/Modal";
import { useUserContext } from "../UserContext";
import { calcDuration } from "../commons";
import ConfirmDialog from "../components/ConfirmDialog";
import { requestSync } from "../hooks/Fetch";

const Playlists = () => {
    const [playlistLoaded, setPlaylistLoaded] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const { playlist_id } = useParams();
    const navigate = useNavigate();

    const [showDelete, setShowDelete] = useState(false);

    const onItemClick = useOutletContext();
    const { user: { token } } = useUserContext();

    const onItemClickPlay = index => {
        onItemClick({
            name: playlist.name,
            items: playlist.items.map(i => {
                return {
                    track: i._id,
                    name: i.name,
                    poster: i.poster,
                    duration: i.duration
                };
            })
        }, index);
    };

    const confirmDelete = () => setShowDelete(true);

    const deletePlaylist = async () => {
        const result = await requestSync({
            url: "/api/playlist/" + playlist_id,
            method: "DELETE",
            token
        });
        if (!result.success) {
            alert(result.msg);
            setShowDelete(false);
        } else {
            setShowDelete(false);
            navigate("/playlists");
        }
    };

    const cancelDelete = () => setShowDelete(false);

    const deletePlaylistItem = async (id) => {
        const result = await requestSync({
            url: `/api/playlist/${playlist_id}/${id}`,
            method: "DELETE",
            token
        });
        if (!result.success)
            alert(result.msg);
        else
            loadList(); // reload list after deleting item
    };

    const loadList = async () => {
        const result = await requestSync({
            url: `/api/playlist/${playlist_id}`,
            method: "GET",
            token
        });
        if (!result.success)
            alert(result.msg);
        else {
            setPlaylist(result.json);
            setPlaylistLoaded(true);
        }
    };

    // get the items in the playlist
    useEffect(() => loadList(), []);

    const getTotalDuration = (p) => {
        return calcDuration(p?.items.reduce((acc, prev) =>  acc + (prev?.duration ?? 0), 0));
    };

    return (
        <div className="bg-gray-800 text-gray-100 min-h-screen p-4 md:py-5 md:px-16">
            {
                playlistLoaded ? (
                    <div>
                        { showDelete ?
                            <Modal open={showDelete} close={cancelDelete}>
                                <ConfirmDialog question="Are you sure you want to delete this playlist?"
                                    cancel={cancelDelete} confirm={deletePlaylist}/>
                            </Modal> : <></>
                        }
                        <div className="flex md:my-12 my-4">
                            <div className="audio_item !bg-transparent relative w-28 md:w-48 flex-shrink-0">
                                <img src={playlist.poster || "https://picsum.photos/200/200?id=" + playlist.name}
                                    alt=" " className="h-28 w-28 md:h-48 md:w-48 rounded-lg"/>
                                <div className="h-28 w-28 md:h-48 md:w-48 absolute top-0 left-0 z-[1]
                                    border-2 rounded-lg hidden fade playFade border-solid border-blue-500
                                    justify-center items-center">
                                    <button onClick={() => onItemClickPlay(0)}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12 block hover:text-blue-500 cursor-pointer"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1
                                                1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button onClick={confirmDelete}
                                        className="bottom-[8px] right-1 absolute hover:text-blue-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                            width="12" height="12">
                                            <path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1
                                                0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16
                                                0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48
                                                0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <h2 className="text-lg md:text-3xl font-semibold mx-10 pt-5 truncate
                                md:whitespace-normal">{playlist.name}</h2>
                        </div>
                        <div className="flex my-2 justify-between">
                            <span>{playlist.items.length + " item" + (playlist.items.length !== 1 ? "s" : "")}</span>
                            <span>{getTotalDuration(playlist)} min</span>
                        </div>
                        <div className="flex flex-col">
                            { playlist.items.map((item, i) =>
                                <PlaylistListItem item={item} key={i} remove={deletePlaylistItem}
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