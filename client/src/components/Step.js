import React from "react";

const Step = ({ iconName, caption }) => {
    const Icon = require("../assets/icons/" + iconName + ".js").default;

    return (
        <div className="flex flex-col items-center mt-8">
            <div className="p-6 rounded-full bg-gray-700
                flex justify-center items-center hover:shadow-lg">
                <Icon width="40" height="40" color="rgb(229, 231, 235)"/>
            </div>
            <figcaption className="text-gray-100 my-5">
                { caption }
            </figcaption>
        </div>
    );
};

export default Step;