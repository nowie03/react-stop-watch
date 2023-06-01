import React, { useState, useEffect } from "react";
import "../css/StopwatchStyle.css"

const Stopwatch = () => {
  // state to store time
  const [time, setTime] = useState(0);
  const [laps,setLaps]=useState([])

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTime(0);
  };

  const lap=() => {
    setLaps([...laps,time])
  }
  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
      <div className="stopwatch-buttons">
        <button className="stopwatch-button start" onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="stopwatch-button reset" onClick={reset}>
          Reset
        </button>
        <button className="stopwatch-button lap" onClick={lap}>
          Lap
        </button>
      </div>
       <div className="stopwatch-laps">
        <h3>Laps</h3>
        {laps.map((lap,index)=>{
          const hours = Math.floor(lap / 360000);

          // Minutes calculation
          const minutes = Math.floor((lap % 360000) / 6000);
        
          // Seconds calculation
          const seconds = Math.floor((lap % 6000) / 100);
        
          // Milliseconds calculation
          const milliseconds = lap % 100;
          return <p>{`lap ${index+1} - ${hours} ${minutes} ${seconds} ${milliseconds}`}</p>
        })}
      </div>
    </div>
  );
};

export default Stopwatch;