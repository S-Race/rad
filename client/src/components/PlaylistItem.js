import React from "react";

import "../styles/audio_item.css";

const PlaylistItem = ({ poster, name, click, id }) => {

    return (
        <div onClick={() => click(id)}
            className="flex flex-col w-52 h-52 my-6 relative audio_item hover:cursor-pointer">
            <img src={poster} alt=" " className="w-52 h-52 rounded-lg"/>
            <span className="block mt-4">{name}</span>
            <div className="w-52 h-52 absolute top-0 left-0 z-[1] border-2 rounded-lg hidden fade playFade
                border-solid border-blue-500 justify-center items-center">
            </div>
        </div>
    );
};

export default PlaylistItem;