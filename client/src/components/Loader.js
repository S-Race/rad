import React, { useEffect, useRef } from "react";

import "../styles/loader.css";

const Loader = ({ text }) => {
    const container = useRef();

    useEffect(() => {
        container.current.style.setProperty("--bg-color-init", "rgb(37, 99, 235)");
        container.current.style.setProperty("--bg-color-end", "rgb(29, 78, 216)");
        let dots = Array.from(container.current.lastChild.childNodes);
        let secs = 0;
        dots.forEach(dot => {
            dot.style.animationDelay = secs + "s";
            secs += 0.2;
        });
    }, []);

    return (
        <div className="loader" ref={container}>
            <span className="font-semibold text-3xl mb-12 inline-block">{text}</span>
            <div className="dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>
    );
};

export default Loader;