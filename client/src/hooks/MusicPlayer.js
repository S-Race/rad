import { useEffect, useRef, useState } from "react";
import { constrain } from "../commons";

const useMusicPlayer = (navigateList) => {
    const SPEEDS = ["1.0", "1.2", "1.5", "1.7", "2.0", "0.5", "0.7"];
    const audioElement = useRef(); // html5 audio element
    const progressBar = useRef(); // div that shows the progress
    const progressBarKnob = useRef(); // knob of the progress div
    const animationRef = useRef(); // reference to animation frame used to update ui
    const progressContainer = useRef(); // container of the entire slider
    const speedRef = useRef(0); // current
    const volumeRef = useRef(1); // init to 100%

    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState({
        current: 0,
        max: 0
    });
    const [buffers, setBuffers] = useState([]);

    const SKIP = 30;

    const changeVolume = amount => volumeRef.current = constrain(amount, 0, 1);

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
        audioElement.current.volume = volumeRef.current;
        setProgress(audioElement.current.currentTime, audioElement.current.duration);
        updateBuffers(audioElement.current.duration);
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
        audioElement.current.addEventListener("ended", async () => {
            // auto get next audio to play
            setIsPlaying(await navigateList(1));
        });
        audioElement.current.addEventListener("error", async () => {
            // auto get next audio to play
            setIsPlaying(await navigateList(1));
        });

    }, [audioElement?.current?.readyState]);

    const changeTrack = () => {
        togglePlayPause();
        audioElement.current.play();
        setIsPlaying(true);
        refreshAnimation();
    };

    const currentSpeed = () => SPEEDS[speedRef.current];

    const updateBuffers = (max) => {
        const { buffered }  = audioElement.current;
        if (!buffered) return [];

        const width = progressContainer.current.getBoundingClientRect().width;

        let list = [];
        for (let i = 0; i < buffered.length; i++) {
            const startPercentage = buffered.start(i) / max;
            const endPercentage = buffered.end(i) / max;
            const bufferWidth = (endPercentage - startPercentage) * width;

            list.push({
                start: Math.floor(startPercentage * 100) + "%",
                width: Math.floor(bufferWidth) + "px"
            });
        }
        setBuffers(list);
    };

    return {
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
        currentVolume: volumeRef.current,
        buffers
    };
};

export { useMusicPlayer };