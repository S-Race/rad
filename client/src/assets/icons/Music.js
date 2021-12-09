import React from "react";

const Music = ({ width, height, color="white" }) => {
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 512 512"
            width={width}
            height={height}
        >
            <path
                fill={color}
                d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"
            ></path>
        </svg>
    );
};

export default Music;