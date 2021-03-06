import React, { useEffect, useState } from "react";

import { calcDuration } from "../commons";
import { useMusicPlayer } from "../hooks/MusicPlayer";
import { useUserContext } from "../UserContext";

import VolumeMute from "../assets/icons/VolumeMute";
import VolumeMiddle from "../assets/icons/VolumeMiddle";
import VolumeHigh from "../assets/icons/VolumeHigh";

const MusicPlayer = ({ track, songName, listName, navigateList }) => {

    const {
        isPlaying,
        time,
        audioElement,
        progressBar,
        progressBarKnob,
        progressContainer,
        togglePlayPause,
        changePlaySpeed,
        changeVolume,
        clickSeek,
        seek,
        changeTrack,
        SKIP,
        currentSpeed,
        currentVolume,
        buffers
    } = useMusicPlayer(navigateList);

    const { user: { token } } = useUserContext();

    useEffect(() => changeTrack(), [track]);

    const determineVolumeIcon = () => {
        return currentVolume < 0.02 ? <VolumeMute width="15" height="15"/> :
            (currentVolume < 0.65 ? <VolumeMiddle width="15" height="15"/> : <VolumeHigh width="15" height="15"/>);
    };

    const [volumeIcon, setVolumeIcon] = useState(determineVolumeIcon());
    useEffect(() => setVolumeIcon(determineVolumeIcon()), [currentVolume]);

    const [hoverPosition, setHoverPosition] = useState({
        time: 0,
        position: 0
    });

    const getPosition = (e) => {
        const leftEnd = progressContainer.current.getBoundingClientRect().x;
        const position = e.clientX;
        const pointerTime = (position - leftEnd) / progressContainer.current.getBoundingClientRect().width * time.max;
        setHoverPosition({
            time: pointerTime,
            position: (pointerTime / time.max) * 100
        });
    };

    return (
        <div className="sticky bottom-0 z-[5]">
            <audio ref={audioElement} src={`/api/audio/${track}?token=${token}`}></audio>
            {/* top panel */}
            <div className="bg-gray-900 border-blue-800 border-b rounded-t-xl p-4 flex items-end">
                <img src={"https://picsum.photos/200/200?id=" + songName}
                    alt="" width="88" height="88"
                    className="flex-none rounded-lg bg-gray-700" />
                <div className="w-full px-5">
                    <div className="min-w-0 flex-auto font-semibold my-2">
                        <p className="text-gray-200 md:text-lg sm:text-base text-sm">
                            {songName}</p>
                        <h2 className="text-gray-600 hidden sm:block sm:text-xs md:text-sm truncate">{listName}</h2>
                    </div>
                    <div className="relative group" onDragOver={seek}
                        onMouseMove={getPosition} ref={progressContainer}>
                        <span className="text bg-blue-500 text-gray-200 px-1 py-2 rounded-sm block mb-1 invisible
                            group-hover:visible absolute bottom-full" style={{ left: hoverPosition.position + "%" }}>
                            {calcDuration(hoverPosition.time)}</span>
                        <div onClick={seek}
                            className="bg-gray-700 rounded-full overflow-hidden cursor-pointer relative">
                            <div ref={progressBar} className="bg-blue-700 h-2 relative z-[4]" role="progressbar"
                                aria-valuenow={time.current} aria-valuemin="0" aria-valuemax={time.max}></div>
                            { buffers?.map((b, i) => <div role="buffer" key={i}
                                className={"bg-blue-500 h-2 absolute z-[2] top-0 rounded-sm"}
                                style={{ width: b.width, left: b.start }}></div> )}
                        </div>
                        <div ref={progressBarKnob} draggable
                            className="ring-blue-600 ring-2 absolute top-1/2 w-4 h-4 -mt-2 -ml-2 flex z-[5]
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
                    <div className="flex items-center">
                        { volumeIcon }
                        <input type="range" min="0" max="1" value={currentVolume} step="0.01"
                            onChange={(e) => changeVolume(e.target.value)}
                            className="w-12 md:w-16 h-0.5 ml-2 outline-none"/>
                    </div>
                    <button type="button" onClick={() => navigateList(-1)}>
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
                    <button type="button" onClick={() => navigateList(1)}>
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
                        {currentSpeed()}x
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;