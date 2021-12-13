import React, { useRef } from "react";

import "../styles/modal.css";

const Modal = ({ children, open, close }) => {
    const modal = useRef();

    const shouldClose = e => {
        if (e.target === modal.current)
            close();
    };

    return (
        <div
            className={"modal " + (open ? "block" : "hidden")}
            onClick={shouldClose}
            ref={modal}
        >
            { children }
        </div>
    );
};

export default Modal;
