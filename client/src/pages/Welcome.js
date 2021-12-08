import React from "react";
import "../styles/welcome.css";

import SnapContainer from "../components/SnapContainer";
import SnapSection from "../components/SnapSection";
import Step from "../components/Step";

import pic1 from "../assets/imgs/HkqFGB7T2g0.jpg";

const Welcome = () => {
    return (
        <div className="text-white">
            <SnapContainer>
                <SnapSection className="firstSection">
                    <div className="flex flex-col justify-center items-center min-h-screen blue_gloss">
                        <h1 className="md:text-5xl text-3xl uppercase font-thin my-3">Take your</h1>
                        <h1 className="md:text-5xl text-3xl uppercase font-bold my-3">Music Everywhere</h1>
                        <h1 className="md:text-5xl text-3xl uppercase font-thin my-3 text-">with <span className="text-blue-700 font-semibold">RAD</span></h1>
                    </div>
                </SnapSection>
                <SnapSection className="flex bg-blue-800 items-center justify-between px-12">
                    <article className="md:w-2/3 w-2/5">
                        <h2 className="md:text-4xl text-2xl md:my-5 my-2">Your personal music server</h2>
                        <div className="md:text-lg text-xl text-gray-200 font-thin">Bringing all of your home music together into one place has never been easier.
                            Your personal Rad Server streams your music to play in any browser</div>
                    </article>
                    <figure className="w-3/5">
                        <img src={pic1} alt="" className="w-3/5 float-right"/>
                    </figure>
                </SnapSection>
                <SnapSection className="bg-yellow-500 py-12">
                    <div className="flex flex-col w-4/5 items-center mx-auto">
                        <h2 className="md:text-5xl text-3xl md:my-16 my-2">How it Works</h2>
                        <section className="flex flex-col md:flex-row justify-between w-2/3 md:mt-24 mt-12">
                            <Step iconName="Download" caption="Install the server"/>
                            <Step iconName="Folder" caption="Config the server"/>
                            <Step iconName="Music" caption="Enjoy your personal Music"/>
                        </section>
                    </div>
                </SnapSection>
            </SnapContainer>
        </div>
    );
};

export default Welcome;
