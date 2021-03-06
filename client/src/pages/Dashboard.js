import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { useUserContext } from "../UserContext";
import Carousel from "../components/Carousel";
import Loader from "../components/Loader";

const Dashboard = () => {
    const [deckLoaded, setDeckLoaded] = useState(false);
    const [deck, setDeck] = useState({});
    const onItemClick = useOutletContext();
    const { user: { token } } = useUserContext();


    useEffect(() => {
        (async () => {
            const data = await fetch("/api/deck", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            if (data.status === 200)
                setDeck(await data.json());
            // TODO if error display an error message saying cant load the deck
            setDeckLoaded(true);
        })();
    }, []);

    return (
        <div className="bg-gray-800 text-gray-100 min-h-screen p-5">
            {
                deckLoaded ? (
                    <>
                        <Carousel title="Continue Listening" items={deck.recommend} click={onItemClick}/>
                        <Carousel title="Recommended" items={deck.resume} click={onItemClick}/>
                    </>
                ) : <Loader text="Loading the deck"/>
            }
        </div>
    );
};

export default Dashboard;