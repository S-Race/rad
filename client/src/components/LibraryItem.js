import React, { useState } from "react";

import "../styles/audio_item.css";

import { calcDuration } from "../commons";
import Modal from "./Modal";
import AddPlaylist from "./AddPlaylist";

const LibraryItem = ({ metadata: { _id, name, duration, categories, tags }, click }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => setModalOpen(false);

    const play = () => {
        click({
            name: name,
            items: [{
                track: _id,
                name: name
            }]
        });
    };

    return (
        <>
            { modalOpen ?
                <Modal open={modalOpen} close={closeModal}>
                    <AddPlaylist finish={closeModal} item_id={_id} />
                </Modal> : <></>
            }
            <div className="flex space-x-3 my-4 flex-shrink-0">
                <div className="relative w-30 h-24 audio_item">
                    <img src={"https://picsum.photos/100/100?id=" + name} alt=""
                        className="flex-none rounded-lg w-30 h-24 flex-shrink-0" />
                    <div className="w-full h-24 absolute top-0 left-0 z-[1] border-2 rounded-lg hidden fade playFade
                        border-solid border-blue-500 justify-center items-center">
                        <button onClick={play}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 block hover:text-blue-500 cursor-pointer"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1
                                    1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                    clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            className="bottom-[8px] right-0 absolute hover:text-blue-500"
                            onClick={() => setModalOpen(true)}>
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 192 512" width="15" height="15">
                                <path
                                    fill="currentColor"
                                    d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24
                                        80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0
                                        39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <span className="text-gray-200 md:text-lg sm:text-base text-sm font-semibold">{name}</span>
                    <div>
                        <span>{calcDuration(duration)}</span>
                        {
                            categories?.length > 0 ?
                                <span className="truncate hidden sm:block">
                                    {categories.reduce((acc, i) => acc + "," + i, "").slice(0, -1)}
                                </span>: <></>
                        }
                        {
                            tags?.length > 0 ?
                                <span className="truncate hidden sm:block">
                                    {tags.reduce((acc, i) => acc + "," + i, "").slice(0, -1)}
                                </span>: <></>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default LibraryItem;