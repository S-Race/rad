import React from "react";

import "../styles/audio_item.css";
import CarouselItem from "./CarouselItem";

const Carousel = ({ title, items, click }) => {
    return (
        <div className="mb-10">
            <h2 className="text-2xl py-6">{ title }</h2>
            <div className="overflow-x-scroll h-auto">
                <div className="space-x-4 flex">
                    { items.map((item, i) => <CarouselItem key={i} info={item} click={click} />) }
                </div>
            </div>
        </div>
    );
};

export default Carousel;