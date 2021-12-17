import React from "react";

const CarouselItem = ({ info }) => {
    return (
        <div className="w-60 h-60 relative rounded-sm flex flex-col carousel_item flex-shrink-0">
            <img src={"https://picsum.photos/200/200?id="+info.name} className="w-60 h-48 rounded-sm rounded-b-none" alt=" "/>
            <div className="w-60 h-48 absolute top-0 left-0 z-10 border-2 hidden fade playFade
                rounded-sm border-solid border-blue-500 justify-center items-center">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 block hover:text-blue-500 cursor-pointer"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1
                            1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className="text-center my-auto overflow-ellipsis overflow-hidden
                w-60 text-base text-gray-100 font-semibold">{ info.name }</div>
        </div>
    );
};

export default CarouselItem;