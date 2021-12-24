import React, { useState }  from "react";
import { Outlet } from "react-router";

import Login from "../pages/Login";
import MusicPlayer from "../components/MusicPlayer";

import { useUserContext } from "../UserContext";

// list struct {
//     name: string,
//     items: [
//         track: string
//         name: string
//     ]
// }

const ProtectedRoutes = () => {
    const { user } = useUserContext();
    const [showPlayer, setShowPlayer] = useState(false);
    const [currentList, setCurrentList] = useState([]);
    const [currentItem, setCurrentItem] = useState(0);

    const onItemClick = async (list, first) => {
        const i = first || 0;
        if (!list.items[i].name) // if name no exist, fetch it
            list.items[i].name = await getItemName(list.items[i].track);
        setCurrentList(list);
        setShowPlayer(true);
        setCurrentItem(i);
    };

    const getItemName = async (track) => {
        const res = await fetch("/api/song/" + track, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.status !== 200) {
            alert("A critical error occurred");
            return;
        }

        return (await res.json()).name;
    };

    const navigateList = async (direction) => {
        const next = currentItem + direction;
        if (next < currentList.items.length && next > -1) {
            if (!currentList.items[next].name) { // if name no exist, fetch it
                currentList.items[next].name = await getItemName(currentList.items[next].track);
                setCurrentList(currentList);
            }
            setCurrentItem(currentItem + direction);
            return true;
        }
        return false;
    };

    return user?.username ?
        <div className="bg-gray-900">
            <Outlet context={onItemClick}/>
            {
                showPlayer ?
                    <MusicPlayer songName={currentList.items[currentItem].name}
                        listName={currentList.name} track={currentList.items[currentItem].track}
                        navigateList={navigateList}/>
                    :
                    <></>
            }
        </div>
        : <Login/>;
};

export default ProtectedRoutes;