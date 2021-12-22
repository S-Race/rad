import React from "react";

import "../styles/carousel.css";

import { calcDuration } from "../commons";

const LibraryItem = ({ metadata: { _id, name, duration, categories, tags }, click }) => {
    return (
        <div className="flex space-x-3 my-4 flex-shrink-0">
            <div className="relative w-30 h-24 carousel_item">
                <img src={"https://picsum.photos/200/200?id=" + name} alt=""
                    className="flex-none rounded-lg w-30 h-24" />
                <div className="w-full h-24 absolute top-0 left-0 z-10 border-2 rounded-lg hidden fade playFade
                    border-solid border-blue-500 justify-center items-center">
                    <button onClick={() => click(_id, name)}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 block hover:text-blue-500 cursor-pointer"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1
                                1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <span className="text-gray-200 md:text-lg sm:text-base text-sm font-semibold">{name}</span>
                <div>
                    <span>{calcDuration(duration)}</span>
                    {
                        categories?.length > 0 ?
                            <span className="truncate hidden sm:block">
                                {categories.reduce((acc, i) => acc + "," + i, "").slice(0, -1)}
                            </span>: <></>
                    }
                    {
                        tags?.length > 0 ?
                            <span className="truncate hidden sm:block">
                                {tags.reduce((acc, i) => acc + "," + i, "").slice(0, -1)}
                            </span>: <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default LibraryItem;