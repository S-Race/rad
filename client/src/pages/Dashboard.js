import React, { useEffect, useState } from "react";

import Carousel from "../components/Carousel";
import MusicPlayer from "../components/MusicPlayer";
import Loader from "../components/Loader";

const Dashboard = () => {
    const [deckLoaded, setDeckLoaded] = useState(false);
    const [deck, setDeck] = useState({});
    const [showPlayer, setShowPlayer] = useState(false);
    const [currentTrack, setCurrentTrack] = useState({
        id: "",
        name: ""
    });

    useEffect(() => {
        (async () => {
            const data = await fetch("/api/deck", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (data.status === 200)
                setDeck(await data.json());
            // TODO if error display an error message saying cant load the deck
            setDeckLoaded(true);
        })();
    }, []);

    const onItemClick = (id, name) => {
        setCurrentTrack({ id, name });
        setShowPlayer(true);
    };

    return (
        <div className="bg-gray-800 text-gray-100 min-h-screen">
            {
                deckLoaded ? (
                    <>
                        <Carousel title="Continue Listening" items={deck.recommend} click={onItemClick}/>
                        <Carousel title="Recommended" items={deck.resume} click={onItemClick}/>
                        {
                            showPlayer ?
                                <MusicPlayer track={currentTrack.id} name={currentTrack.name} autoplay={true}/>
                                :
                                <></>
                        }
                    </>
                ) : <Loader text="Loading the deck"/>
            }
        </div>
    );
};

export default Dashboard;