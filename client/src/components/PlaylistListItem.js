import React, { useEffect, useState } from "react";

import { useUserContext } from "../UserContext";
import { calcDuration } from "../commons";

const PlaylistListItem = ({ index, id, click }) => {
    const [metadata, setMetadata] = useState({});

    const { user: { token } } = useUserContext();

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/song/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (res.status !== 200) {
                // alert("A critical error occurred");
                return;
            }

            setMetadata(await res.json());
        })();
    }, []);

    return (
        <div className="flex hover:bg-gray-600 md:p-4 py-2 hover:cursor-pointer" onClick={() => click(index)}>
            <div className="flex mr-10 items-center">
                <span className="block md:mr-8 mr-4">{index + 1}</span>
                <img src={metadata?.poster || "https://picsum.photos/100/100?id=" + id} alt=" "
                    className="h-20 w-20 flex-shrink-0"/>
            </div>
            <div className="flex justify-between items-center w-full">
                <span className="block">{metadata?.name}</span>
                <span className="block">{calcDuration(metadata?.duration)}</span>
            </div>
        </div>
    );
};

export default PlaylistListItem;