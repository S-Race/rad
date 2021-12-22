import React from "react";

const PageButton = ({ id, click, active }) => {
    return (
        <div onClick={() => click(id)}
            className={"rounded-lg text-gray-100 w-fit cursor-pointer p-3"
                + (active ? " bg-red-400" : " bg-blue-500")}>
            {id}
        </div>
    );
};

export default PageButton;