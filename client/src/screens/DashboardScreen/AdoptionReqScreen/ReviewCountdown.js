import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";

  const ReviewCountdown = ({ hoursMinSecs }) => {

    const { days = 0, hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
    const [[dys, hrs, mins, secs], setTime] = React.useState([days, hours, minutes, seconds]);
    
    const tick = () => {
        if (days === 0 && hrs === 0 && mins === 0 && secs === 0) 
            reset()
        else if (mins === 0 && secs === 0) {
            setTime([dys, hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([dys, hrs, mins - 1, 59]);
        } else {
            setTime([dys, hrs, mins, secs - 1]);
        }
    };

    const reset = () => setTime([parseInt(days), parseInt(hours), parseInt(minutes), parseInt(seconds)]);
    
    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    return (
        <div>
            <Typography variant="body2">
            {`Sisa waktu review: ${dys.toString().padStart(1, '0')} hari ${hrs.toString().padStart(1, '0')} jam ${mins
            .toString()
            .padStart(1, '0')} menit`}
            </Typography>
        </div>
    );
}

export default ReviewCountdown;