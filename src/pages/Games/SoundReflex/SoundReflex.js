import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Howl } from "howler";

import "./SoundReflex.css";

const body = document.body;
let tone = null;
let scores = [];
let clicked = null;
let isPlaying = false;
let startedPlaying = null;
let startedPlayingTimer = null;
let numOfTries = 0;
let averageScore = 0;

const SoundReflex = function () {
  const navigate = useNavigate();
  const [screenText, setScreenText] = useState("CLICK TO START!");
  const [isShowingScore, setIsShowingScore] = useState(false);
  const [isShowingAverage, setIsShowingAverage] = useState(false);
  let info = numOfTries <= 5 ? `${numOfTries}/5` : "Practice mode";

  useEffect(() => {
    body.style.overflow = "hidden";
    return () => {
      clearTimeout(startedPlayingTimer);
      startedPlayingTimer = null;
      scores = [];
      clicked = null;
      isPlaying = false;
      startedPlaying = null;
      numOfTries = 0;
      tone = null;
    };
  }, []);

  const bbb = useRef();

  const countdownFrom = function (maxTime) {
    const number = Math.floor(Math.random() * (maxTime - 3 + 1)) + 3;
    return number * 1000;
  };

  const startGame = function () {
    if (!tone) {
      tone = new Howl({
        src: ["./sounds/tone.mp3"],
      });
      console.log("Made a tone");
    }
    const timer = countdownFrom(3);
    // const timer = 20;
    // setTimeout(() => {
    //   bbb.current.click();
    //   bbb.current.click();
    // }, timer + 100);
    startedPlayingTimer = setTimeout(() => {
      tone.play();
      startedPlaying = Date.now();
      isPlaying = true;
      setScreenText("CLICK NOW!");
    }, timer);
  };

  const nextStep = function () {
    clicked = Date.now();

    if (screenText === "CLICK NOW!") {
      isPlaying = false;
      tone.stop();
      scores.push(clicked - startedPlaying);
      numOfTries++;
      const sum = scores.reduce((partialSum, a) => partialSum + a, 0);
      averageScore = sum / scores.length;
      if (numOfTries === 5) {
        setIsShowingAverage(true);
        setScreenText(
          `Your average score is ${Math.floor(averageScore) - 3} ms !`
        );
        return;
      }
      console.log(averageScore);
      setIsShowingScore(true);
      setScreenText(`${scores[scores.length - 1]} ms`);
    } else if (isShowingScore) {
      setIsShowingScore(false);

      if (numOfTries >= 5) numOfTries = 99;
      setScreenText("WAIT FOR THE TONE...");
      startGame();
    } else if (isShowingAverage) {
      numOfTries = 99;
      setIsShowingAverage(false);
      setScreenText("WAIT FOR THE TONE...");
      startGame();
    } else if (screenText === "CLICKED TOO SOON!") {
      setScreenText("WAIT FOR THE TONE...");
      startGame();
      body.style.backgroundColor = "rgb(50, 140, 205)";
    } else if (screenText === "WAIT FOR THE TONE...") {
      if (!isPlaying) {
        clearTimeout(startedPlayingTimer);
        startedPlayingTimer = null;
        setScreenText("CLICKED TOO SOON!");
        body.style.backgroundColor = "rgb(200, 20, 20)";

        return;
      }
      startGame();
    } else if (screenText === "CLICK TO START!") {
      setScreenText("WAIT FOR THE TONE...");
      startGame();
    }
  };

  return (
    <div ref={bbb} onClick={nextStep} className="sound-reflex-game-container">
      <button className="go-back-button" onClick={() => navigate("/")}>
        Go back
      </button>
      <div className="screenText">
        <p>{screenText}</p>
        {isShowingAverage && <p>Click to keep practicing.</p>}
        <p>{info}</p>
      </div>
    </div>
  );
};

export default SoundReflex;
