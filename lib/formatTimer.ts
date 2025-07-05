export default function formatTimer(
    timeInSeconds: number,
    isHour: boolean = false
) {
    let hours = timeInSeconds / 3600;
    let minutes = (hours - Math.floor(hours)) * 60;
    let seconds = (minutes - Math.floor(minutes)) * 60;

    hours = Math.floor(hours);
    minutes = Math.floor(minutes);
    seconds = Math.floor(seconds);

    const formatter = new Intl.NumberFormat("en-US", {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 0,
    });

    if (isHour) {
        if (minutes === 0) return `${seconds} sec`;

        if (hours === 0) return `${minutes} Min ${seconds} sec`;

        return `${hours} Hour ${minutes} min`;
    }

    return `${formatter.format(minutes)}:${formatter.format(seconds)}`;
}
