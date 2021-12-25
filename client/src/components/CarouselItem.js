import React, { useState } from "react";
import AddPlaylist from "./AddPlaylist";

import Modal from "./Modal";

const CarouselItem = ({ info, click }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => setModalOpen(false);

    const play = () => {
        click({
            name: info.name,
            items: [{
                track: info._id,
                name: info.name
            }]
        });
    };

    return (
        <>
            { modalOpen ?
                <Modal open={modalOpen} close={closeModal}>
                    <AddPlaylist finish={closeModal} item_id={info._id} />
                </Modal> : <></>
            }
            <div className="w-60 h-60 relative rounded-sm flex flex-col audio_item flex-shrink-0">
                <img
                    src={"https://picsum.photos/200/200?id=" + info.name}
                    className="w-60 h-48 rounded-sm rounded-b-none"
                    alt=" "
                />
                <div
                    className="w-60 h-48 absolute top-0 left-0 z-[1] border-2 hidden fade playFade
                    rounded-sm border-solid border-blue-500"
                >
                    <button onClick={play} className="bottom-[65px] right-[85px] absolute">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 block hover:text-blue-500 cursor-pointer"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1
                                1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <button
                        className="bottom-[8px] right-0 absolute hover:text-blue-500"
                        onClick={() => setModalOpen(true)}>
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 192 512" width="20" height="20">
                            <path
                                fill="currentColor"
                                d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24
                                    80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0
                                    39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div
                    className="text-center my-auto overflow-ellipsis overflow-hidden
                    w-60 text-base text-gray-100 font-semibold"
                >
                    {info.name}
                </div>
            </div>
        </>
    );
};

export default CarouselItem;