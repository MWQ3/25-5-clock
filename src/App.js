import { useState, useEffect } from 'react';

function App() {
  const [breakLen, setBreakLen] = useState(5);
  const [sessionLen, setSessionLen] = useState(25);
  const [sessionBreak, setSessionBreak] = useState("Session");
  const [remainingTime, setRemainingTime] = useState(1500);
  const [play, setPlay] = useState(false);
  
  
  const handleBreakInc = () => {
    if(breakLen < 60) {
      setBreakLen(breakLen + 1);
    };
  };
  
  const handleBreakDec = () => {
    if(breakLen > 1) {
      setBreakLen(breakLen - 1);
    };
  };
  
  const handleSessionInc = () => {
    if(sessionLen < 60) {
      setSessionLen(sessionLen + 1);
      setRemainingTime(remainingTime + 60);
    };
  };
  
  const handleSessionDec = () => {
    if(sessionLen > 1) {
      setSessionLen(sessionLen - 1);
      setRemainingTime(remainingTime - 60);
    };
  };
  
  const formatTime = () => {
    const min = Math.floor(remainingTime / 60);
    const sec = remainingTime - min * 60;
    const formatMin = min < 10 ? `0${min}` : min;
    const formatSec = sec < 10 ? `0${sec}` : sec;
    
    return `${formatMin}:${formatSec}`;
  };
  
  const timeout = () => { 
    setTimeout(() => {
    if(remainingTime && play) {
      setRemainingTime(remainingTime - 1)
    };
  }, 1000);
}
  
  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };
  
  const handleClock = () => {
    if(play) {
      timeout()
      timerReset()
    } else {
      clearTimeout(timeout)  
    }
  };
  
  const timerReset = () => {
    const audio = document.getElementById("beep")
    if(!remainingTime && sessionBreak === "Session") {
      setRemainingTime(breakLen * 60);
      setSessionBreak("Break");
      audio.play()
    };
    if(!remainingTime && sessionBreak === "Break") {
      setRemainingTime(sessionLen * 60);
      setSessionBreak("Session")
      audio.pause();
      audio.currentTime = 0;
    };
  };
  
  const handleReset = () => {
    const audio = document.getElementById("beep");
    clearTimeout(timeout);
    setBreakLen(5);
    setSessionLen(25);
    setSessionBreak("Session");
    setRemainingTime(1500);
    setPlay(false);
    audio.pause();
    audio.currentTime = 0;
  }
  
  useEffect(() => {
    handleClock()
     // eslint-disable-next-line
  }, [play, timeout, remainingTime])
  
  const sessionBreakCntrl = sessionBreak === "Session" ? "Session" : "Break";
  
  return (
  <div className="container">
      <h1>25 + 5 Clock</h1>
      <div className="session-settings">
        <div className="break-length">
          <h2 id="break-label">Break Length</h2>
          <div className="session-btns">
            <button disabled={play} onClick={handleBreakDec} id="break-decrement"><i className="fa fa-arrow-down"></i></button>
            <span id="break-length">{breakLen}</span>
            <button disabled={play} onClick={handleBreakInc} id="break-increment"><i className="fa fa-arrow-up"></i></button>
          </div>
        </div>
        <div className="session-length">
          <h2 id="session-label">Session Length</h2>
          <div className="session-btns">
            <button disabled={play} onClick={handleSessionDec} id="session-decrement"><i className="fa fa-arrow-down"></i></button>
            <span id="session-length">{sessionLen}</span>
            <button disabled={play} onClick={handleSessionInc} id="session-increment"><i className="fa fa-arrow-up"></i></button>
          </div>
        </div>
      </div>
      <div className="session-display-cntrl">
        <div className="session-display">
          <h2 id="timer-label">{sessionBreakCntrl}</h2>
          <h1 id="time-left">{formatTime()}</h1>
        </div>
        <div className="session-cntrl">
          <button onClick={handlePlay} id="start_stop"><i className="fa fa-play"></i><i className="fa fa-pause"></i></button>
          <button onClick={handleReset} id="reset"><i className="fa fa-repeat"></i></button>
        </div>
      </div>
      <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>
  </div>
  );
};

export default App;