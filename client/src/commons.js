const calcDuration = seconds => {
    const pad = (v, n=2) => {
        v = v + ""; // convert to string
        if (v.length === n)
            return v;
        for (let i = 0; i < n; i++) {
            v = "0" + v;
            if (v.length >= n)
                break;
        }
        return v;
    };

    const min = 60;
    if (!seconds && seconds !== 0) return "-";
    if (seconds < min) return "00:" + pad(Math.floor(seconds));
    else if (seconds < 60 * min) {
        let mins = Math.floor(seconds / 60);
        let secs = Math.floor(seconds % 60);
        return pad(mins) + ":" + pad(secs);
    } else {
        let hrs = Math.floor(seconds / 60 / 60);
        let mins = Math.floor((seconds - (hrs * 60 * 60)) / 60);
        let secs = Math.floor((seconds - (hrs * 60 * 60)) % 60);
        return pad(hrs) + ":" + pad(mins) + ":" + pad(secs);
    }
};

const constrain = (value, min, max) => {
    if (value > max)
        return max;
    if (value < min)
        return min;
    return value;
};


export {
    calcDuration,
    constrain
};