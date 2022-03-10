import { useState, useRef, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import "./AimReflex.css";

const body = document.body;
let scores = [];
let clicked = null;
let isTiming = false;
let turnedVisible = null;
let turnVisibleTimer = null;
let numOfTries = 0;
let averageScore = 0;

const AimReflex = function () {
  const [isVisible, setIsVisible] = useState(false);
  const [welcomeScreen, setWelcomeScreen] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isShowingScore, setIsShowingScore] = useState(false);
  const [isShowingAverage, setIsShowingAverage] = useState(false);
  const targetElement = useRef();
  const navigate = useNavigate();

  let info = numOfTries <= 5 ? `${numOfTries}/5` : "Practice mode";

  useEffect(() => {
    body.style.overflow = "hidden";
    return () => {
      clearTimeout(turnVisibleTimer);
      turnVisibleTimer = null;
      scores = [];
      clicked = null;
      isTiming = false;
      turnedVisible = null;
      numOfTries = 0;
    };
  }, []);

  const countdownFrom = function (maxTime) {
    const number = Math.floor(Math.random() * (maxTime - 3 + 1)) + 3;
    return number * 1000;
  };

  const calcNewPosition = function () {
    const plusMinusX = Math.random() < 0.5 ? 1 : -1;
    const plusMinusY = Math.random() < 0.5 ? 1 : -1;
    const positionX = Math.floor((Math.random() * 100) / 2) * plusMinusX;
    const positionY = Math.floor((Math.random() * 100) / 2) * plusMinusY * 0.75;
    const position = [positionX, positionY];

    return position;
  };

  const startGame = function () {
    clicked = Date.now();
    setIsVisible(false);
    const newPosition = calcNewPosition();

    targetElement.current.style.transform = `translate(${newPosition[0]}vw,${newPosition[1]}vh)`;

    if (!isTiming) {
      const timer = countdownFrom(3);
      //   const timer = 100;
      //   setTimeout(() => {
      //     targetElement.current.click();
      //     nextStep();
      //   }, timer + 150);
      turnVisibleTimer = setTimeout(() => {
        turnedVisible = Date.now();
        isTiming = true;
        setIsVisible(true);
      }, timer);
    } else if (isTiming) {
      numOfTries++;
      if (numOfTries === 5) {
        setIsShowingScore(false);
        setIsShowingAverage(true);
      }
      setIsShowingScore(true);
      setIsRunning(false);
      isTiming = false;
      scores.push(clicked - turnedVisible);
      const sum = scores.reduce((partialSum, a) => partialSum + a, 0);
      averageScore = sum / scores.length;
    }
  };

  const toggleStart = function () {
    setWelcomeScreen(false);
    setIsShowingScore(false);
    setIsRunning(true);
    setIsShowingAverage(false);
    startGame();
  };

  const nextStep = function (e) {
    if (isShowingAverage) {
      numOfTries++;
      toggleStart();
    } else if (isShowingScore || !isRunning) {
      toggleStart();
    }
  };

  return (
    <div className="aim-reflex-game-container" onClick={nextStep}>
      <button className="go-back-button" onClick={() => navigate("/")}>
        Go back
      </button>
      {welcomeScreen && <p>CLICK TO START!</p>}

      <div
        className={`aim-target ${isVisible ? "aim-target-visible" : null}`}
        onClick={startGame}
        ref={targetElement}
      ></div>

      {isShowingScore && !isShowingAverage && (
        <p>{scores[scores.length - 1]}ms</p>
      )}
      {isShowingAverage && (
        <Fragment>
          <p>{`Your average score is ${Math.floor(averageScore) - 3} ms !`}</p>

          <p>Click to keep practicing.</p>
        </Fragment>
      )}
      <p className="aim-reflex-game-info">{info}</p>
    </div>
  );
};

export default AimReflex;
