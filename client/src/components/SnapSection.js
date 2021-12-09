import React from "react";

const SnapSection = ({ children, className }) => {
    return (
        <section className={"snap " + className}>
            { children }
        </section>
    );
};

export default SnapSection;