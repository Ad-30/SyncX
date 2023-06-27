import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(600);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      setExpired(true);
    }
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="time-div">
      <div className="timer-container">
        {expired ? (
          <h1 className="expired-text">Code Expired</h1>
        ) : (
          <>
            <h1 className="timer-text">{formatTime(seconds)}</h1>
            <p>Code is valid for 10 mins</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Timer;
