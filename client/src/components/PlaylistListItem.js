import React from "react";

import { calcDuration } from "../commons";

const PlaylistListItem = ({ index, item: { _id: id, name, duration, poster }, click }) => {
    return (
        <div className="flex hover:bg-gray-600 md:p-4 py-2 hover:cursor-pointer" onClick={() => click(index)}>
            <div className="flex mr-10 items-center">
                <span className="block md:mr-8 mr-4">{index + 1}</span>
                <img src={poster || "https://picsum.photos/100/100?id=" + id} alt=" "
                    className="h-20 w-20 flex-shrink-0"/>
            </div>
            <div className="flex justify-between items-center w-full">
                <span className="block">{name}</span>
                <span className="block">{calcDuration(duration)}</span>
            </div>
        </div>
    );
};

export default PlaylistListItem;