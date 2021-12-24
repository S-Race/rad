import React, { useState }  from "react";
import { Outlet } from "react-router";

import Login from "../pages/Login";
import MusicPlayer from "../components/MusicPlayer";

import { useUserContext } from "../UserContext";

const ProtectedRoutes = () => {
    const { user } = useUserContext();
    const [showPlayer, setShowPlayer] = useState(false);
    const [currentList, setCurrentList] = useState([]);
    const [startItem, setStartItem] = useState(0);

    const onItemClick = (items, first) => {
        setCurrentList(items);
        setShowPlayer(true);
        setStartItem(first || 0);
    };

    return user?.username ?
        <div className="bg-gray-900">
            <Outlet context={onItemClick}/>
            {
                showPlayer ?
                    <MusicPlayer list={currentList} autoplay={true} initialTrack={startItem}/>
                    :
                    <></>
            }
        </div>
        : <Login/>;
};

export default ProtectedRoutes;