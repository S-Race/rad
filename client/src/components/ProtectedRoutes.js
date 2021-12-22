import React, { useState }  from "react";
import { Outlet } from "react-router";

import Login from "../pages/Login";
import MusicPlayer from "../components/MusicPlayer";

import { useUserContext } from "../UserContext";

const ProtectedRoutes = () => {
    const { user } = useUserContext();
    const [showPlayer, setShowPlayer] = useState(false);
    const [currentTrack, setCurrentTrack] = useState({
        id: "",
        name: ""
    });

    const onItemClick = (id, name) => {
        setCurrentTrack({ id, name });
        setShowPlayer(true);
    };

    return user?.username ?
        <div className="bg-gray-900">
            <Outlet context={onItemClick}/>
            {
                showPlayer ?
                    <MusicPlayer track={currentTrack.id} name={currentTrack.name} autoplay={true}/>
                    :
                    <></>
            }
        </div>
        : <Login/>;
};

export default ProtectedRoutes;