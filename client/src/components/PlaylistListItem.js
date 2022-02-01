import React, { useState } from "react";

import { calcDuration } from "../commons";
import ConfirmDialog from "../components/ConfirmDialog";
import Modal from "../components/Modal";

const PlaylistListItem = ({ index, item: { _id: id, name, duration, poster }, click, remove }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const confirmDelete = (e) => {
        e.stopPropagation(); // dont allow click to hit parent div and play item
        setDialogOpen(true);
    };

    const cancelDelete = (e) => {
        e.stopPropagation(); // dont allow click to hit parent div and play item
        setDialogOpen(false);
    };

    const deleteItem = (e) => {
        e.stopPropagation(); // dont allow click to hit parent div and play item
        setDialogOpen(false);
        remove(id);
    };

    return (
        <div className="flex hover:bg-gray-600 md:p-4 py-2 hover:cursor-pointer" onClick={() => click(index)}>
            { dialogOpen ? <Modal open={dialogOpen} close={cancelDelete}>
                <ConfirmDialog question="Are you sure you want to remove this item from the playlist?"
                    cancel={cancelDelete} confirm={deleteItem}/>
            </Modal> : <></>
            }
            <div className="flex mr-10 items-center">
                <div className="group">
                    <span className="group-hover:hidden block md:mr-8 mr-4">{index + 1}</span>
                    <svg className="group-hover:block hidden md:mr-8 mr-4" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512" height="10" width="10" onClick={confirmDelete}>
                        <path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32
                            32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                    </svg>
                </div>
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