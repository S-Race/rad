import React, { useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router";

import MusicPlayer from "../components/MusicPlayer";
import Loader from "../components/Loader";

import { useUserContext } from "../UserContext";

// list struct {
//     name: string,
//     items: [
//         track: string
//         name: string
//     ]
// }

const ProtectedRoutes = () => {
    const { user, dispatch, userActions } = useUserContext();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [showPlayer, setShowPlayer] = useState(false);
    const [currentList, setCurrentList] = useState([]);
    const [currentItem, setCurrentItem] = useState(0);


    const onItemClick = async (list, first) => {
        const i = first || 0;
        setCurrentList(list);
        setShowPlayer(true);
        setCurrentItem(i);
    };

    const navigateList = async (direction) => {
        const next = currentItem + direction;
        if (next < currentList.items.length && next > -1) {
            setCurrentItem(currentItem + direction);
            return true;
        }
        return false;
    };

    useEffect(() => {
        const getToken = async () => {
            const res = await fetch("/api/auth/token", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status === 200) {
                const { token, userInfo } = (await res.json());
                dispatch({
                    type: userActions.LOGIN,
                    payload: { ...userInfo, token }
                });
                setLoading(false);
            } else navigate("/login"); // couldn't get token ... probably due to no cookie
        };

        getToken();
    }, [user?.username]);

    return loading ? <Loader text="Getting everything set for you"/> : (
        user?.username ?
            <div className="bg-gray-900">
                <Outlet context={onItemClick}/>
                {
                    showPlayer ?
                        <MusicPlayer songName={currentList.items[currentItem]?.name}
                            listName={currentList?.name} track={currentList.items[currentItem]?.track}
                            navigateList={navigateList}/>
                        :
                        <></>
                }
            </div>
            : <></>
    );
};

export default ProtectedRoutes;