import React, { useEffect, useState } from "react";

import Carousel from "../components/Carousel";

const Dashboard = () => {
    const [deckLoaded, setDeckLoaded] = useState(false);
    const [deck, setDeck] = useState({});

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

    return (
        <div className="bg-gray-800 text-gray-100 min-h-screen">
            {
                deckLoaded ? (
                    <>
                        <Carousel title="Continue Listening" items={deck.recommend} />
                        <Carousel title="Recommended" items={deck.resume} />
                    </>
                ) : <h2 className="text-4xl">Loading the deck</h2>
                // this ^ will be a spinner later
            }
        </div>
    );
};

export default Dashboard;