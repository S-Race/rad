import React, { useRef, useState, useEffect } from "react";

import { calcDuration, constrain } from "../commons";

const MusicPlayer = ({ name, track }) => {
    const SPEEDS = ["1.0", "1.5", "2.0", "0.5"];
    const audioElement = useRef(); // html5 audio element
    const progressBar = useRef(); // div that shows the progress
    const progressBarKnob = useRef(); // knob of the progress div
    const animationRef = useRef(); // reference to animation frame used to update ui
    const progressContainer = useRef(); // container of the entire slider
    const speedRef = useRef(0); // current

    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState({
        current: 0,
        max: 0
    });

    const SKIP = 30;

    const changePlaySpeed = () => {
        speedRef.current = (speedRef.current + 1) % SPEEDS.length;
    };

    const refreshAnimation = () => {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(whilePlaying);
    };

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioElement.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioElement.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    };

    // update the ui elements as the audio plays
    const whilePlaying = () => {
        setTime({
            ...time,
            current: audioElement.current.currentTime,
            max: audioElement.current.duration
        });
        audioElement.current.playbackRate = SPEEDS[speedRef.current];
        setProgress(audioElement.current.currentTime, audioElement.current.duration);
        animationRef.current = requestAnimationFrame(whilePlaying);
    };

    // this is called when u click on either of the 2 seek buttons
    const clickSeek = (forward) => {
        const offset = forward ? SKIP : -SKIP;
        const currentTime = audioElement.current.currentTime;
        const changeTime = constrain(currentTime + offset, 0, time.max);
        audioElement.current.currentTime = changeTime;
        setTime({ ...time, current: changeTime });
        setProgress(changeTime, time.max);
    };

    // this is called when u drag the slider knob or a point on the slider itself
    const seek = (e) => {
        const min = progressContainer.current.getBoundingClientRect().x;
        const width = progressContainer.current.getBoundingClientRect().width;

        // calculate percentage played based on the size of the slider
        const percentage = (Math.floor(constrain(e.clientX - min, 0, width)) / width);
        const changeDuration = percentage * time.max;
        audioElement.current.currentTime = changeDuration;
        setTime({ ...time, current: changeDuration });
        setProgress(changeDuration, time.max);
    };

    // update ui elements to reflect the progress of the audio
    const setProgress = (current, max) => {
        const percentage = max !== 0 && !isNaN(max) ? (current / max) * 100 : 0;
        progressBar.current.style.setProperty("width", percentage + "%");
        progressBarKnob.current.style.setProperty("left", percentage + "%");
    };

    useEffect(() => {
        const seconds = Math.floor(audioElement.current.duration);
        setTime({
            ...time,
            max: seconds
        });
        setProgress(time.current, time.max);
        audioElement.current.addEventListener("ended", () => setIsPlaying(false));
        audioElement.current.addEventListener("error", () => {
            setIsPlaying(false);
            // auto get next audio to play
            // ...
        });

    }, [audioElement?.current?.readyState]);

    useEffect(() => {
        togglePlayPause();
        audioElement.current.play();
        setIsPlaying(true);
        refreshAnimation();
    }, [track]);

    return (
        <div className="sticky bottom-0 z-20">
            <audio ref={audioElement} src={"/api/audio/" + track}></audio>
            {/* top panel */}
            <div className="bg-gray-900 border-blue-800 border-b rounded-t-xl p-4 flex items-end">
                <img src={"https://picsum.photos/200/200?id=" + name} alt="" width="88" height="88"
                    className="flex-none rounded-lg bg-gray-700" />
                <div className="w-full px-5">
                    <div className="min-w-0 flex-auto font-semibold my-2">
                        <p className="text-gray-200 md:text-lg sm:text-base text-sm">{name}</p>
                        <h2 className="text-gray-600 hidden sm:block sm:text-xs md:text-sm truncate">{track}</h2>
                    </div>
                    <div className="relative" onDragOver={seek} ref={progressContainer}>
                        <div className="bg-gray-700 rounded-full overflow-hidden cursor-pointer" onClick={seek}>
                            <div ref={progressBar} className="bg-blue-700 h-2" role="progressbar"
                                aria-valuenow={time.current} aria-valuemin="0" aria-valuemax={time.max}></div>
                        </div>
                        <div ref={progressBarKnob} draggable
                            className="ring-blue-600 ring-2 absolute top-1/2 w-4 h-4 -mt-2 -ml-2 flex
                                items-center justify-center bg-white rounded-full shadow cursor-pointer">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full
                                ring-1 ring-inset ring-gray-900/5"></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
                        <div className="text-gray-200">{calcDuration(time.current)}</div>
                        <div className="text-gray-400">{calcDuration(time.max)}</div>
                    </div>
                </div>
            </div>

            {/* bottom panel */}
            <div className="bg-blue-800 text-gray-200 flex items-center py-4">
                {/* left side buttons */}
                <div className="flex-auto flex items-center justify-evenly">
                    <button type="button">
                        <svg width="24" height="24">
                            <path
                                d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z"
                                fill="currentColor" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button type="button">
                        <svg width="24" height="24" fill="none">
                            <path d="m10 12 8-6v12l-8-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6v12" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button type="button" onClick={() => clickSeek(false)} className="hidden sm:block">
                        <svg
                            width="35" height="24" fill="none">
                            <path
                                d="m 15.436446,14.918003 c 2.861,2.733 7.5,2.733 10.362,0
                                    2.861,-2.734 2.861,-7.1660001 0,-9.9000001 -2.862,-2.733 -7.501,-2.733
                                    -10.362,0 a 7.096,7.096 0 0 0 -0.992,1.176"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="m 13.944446,2.9680029 v 3.111 c 0,0.491 0.398,0.889 0.889,0.889 h 3.111"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"/>
                            <text x="0" y="16" fill="currentColor" fontWeight="bold" fontSize="10px">{SKIP}</text>
                        </svg>
                    </button>
                </div>

                {/* play button */}
                <button
                    type="button" className="bg-gray-100 text-blue-900 flex-none -my-2 mx-auto w-12 h-12
                        rounded-full ring-1 ring-gray-900/5 shadow-md flex items-center justify-center"
                    onClick={togglePlayPause}>
                    {
                        isPlaying ?
                            <svg width="15" height="16" fill="currentColor">
                                <rect x="3" y="2" width="2" height="12" rx="1" />
                                <rect x="10" y="2" width="2" height="12" rx="1" />
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 block hover:text-blue-500 cursor-pointer"
                                viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1
                                    1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                    clipRule="evenodd" />
                            </svg>
                    }
                </button>

                {/* right side buttons */}
                <div className="flex-auto flex items-center justify-evenly">
                    <button type="button" onClick={() => clickSeek(true)} className="hidden sm:block">
                        <svg width="35" height="24" fill="none">
                            <path d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166
                                0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 5v3.111c0 .491-.398.889-.889.889H15" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" />
                            <text x="22" y="16" fill="currentColor" fontWeight="bold" fontSize="10px">{SKIP}</text>
                        </svg>
                    </button>
                    <button type="button">
                        <svg width="24" height="24" fill="none">
                            <path d="M14 12 6 6v12l8-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18 6v12" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        type="button" onClick={changePlaySpeed}
                        className="rounded-lg text-xs leading-6 font-semibold px-2 ring-2
                        ring-inset ring-gray-200 text-gray-200">
                        {SPEEDS[speedRef.current]}x
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;