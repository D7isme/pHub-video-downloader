function parseISODuration(duration) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = duration.match(regex);
    const hours = parseInt(matches[1] || 0, 10);
    const minutes = parseInt(matches[2] || 0, 10);
    const seconds = parseInt(matches[3] || 0, 10);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return {
        hours,
        minutes,
        seconds,
        totalSeconds
    };
}

// Example usage
// const durationString = "PT00H16M24S";
// const parsedDuration = parseISODuration(durationString);

// console.log(parsedDuration); // { hours: 0, minutes: 16, seconds: 24, totalSeconds: 984 }

module.exports = parseISODuration