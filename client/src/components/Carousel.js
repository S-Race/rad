import React from "react";

import "../styles/carousel.css";
import CarouselItem from "./CarouselItem";

const Carousel = ({ title, items, click }) => {
    return (
        <div className="md:mx-8 mx-4 py-4">
            <h2 className="text-2xl py-6">{ title }</h2>
            <div className="overflow-x-scroll h-auto">
                <div className="space-x-4 carousel flex">
                    { items.map((item, i) => <CarouselItem key={i} info={item} click={click} />) }
                </div>
            </div>
        </div>
    );
};

export default Carousel;