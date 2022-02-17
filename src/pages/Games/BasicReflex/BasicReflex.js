import { useState, useRef, useCallback, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import "./BasicReflex.css";

const body = document.body;
const scores = [];
let turnedGreen = null;
let clicked;
let isTiming = false;
let turnGreenTimer = null;
let numOfTries = 0;
let averageScore;

const BasicReflex = function () {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const [isShowingScore, setIsShowingScore] = useState(false);
  const [clickedTooEarly, setClickedTooEarly] = useState(false);
  const [isShowingAverage, setIsShowingAverage] = useState(false);
  const bodyRef = useRef();
  let info = numOfTries <= 5 ? `${numOfTries}/5` : "Practice mode";

  const countdownFrom = function (maxTime) {
    const number = Math.floor(Math.random() * (maxTime - 3 + 1)) + 3;
    return number * 1000;
  };

  const goBackHandler = function () {
    reset();
    navigate("/");
  };

  const reset = useCallback(function () {
    setIsStarted(false);
    setIsShowingScore(false);
    setClickedTooEarly(false);
    isTiming = false;
    clearTimeout(turnGreenTimer);
    turnGreenTimer = null;
    turnedGreen = null;
    body.style.backgroundColor = "rgb(52, 138, 207)";
  }, []);

  const startGame = function () {
    clicked = Date.now();

    if (clickedTooEarly) {
      reset();
      clearTimeout(turnGreenTimer);
      turnGreenTimer = null;
      body.style.backgroundColor = "rgb(52, 138, 207)";
      return;
    }

    if (isShowingScore) {
      reset();
      body.style.backgroundColor = "rgb(52, 138, 207)";
      return;
    }

    if (isShowingAverage) {
      numOfTries++;
      setIsShowingAverage(false);
      return;
    }

    if (isTiming) {
      if (clicked < turnedGreen || turnedGreen === null) {
        body.style.backgroundColor = "rgb(200, 20, 20)";
        clearTimeout(turnGreenTimer);
        setClickedTooEarly(true);
        return;
      }
      const reactionTime = clicked - turnedGreen;
      scores.push(reactionTime);
      const sum = scores.reduce((partialSum, a) => partialSum + a, 0);
      averageScore = sum / scores.length;
      console.log(averageScore);
      if (numOfTries < 5) {
        numOfTries++;
        if (numOfTries === 5) {
          reset();
          setIsShowingAverage(true);
          return;
        }
      }

      reset();
      setIsShowingScore(true);
      body.style.backgroundColor = "rgb(52, 138, 207)";
    } else if (!isTiming && !isShowingScore) {
      const timer = countdownFrom(3);
      // const timer = 100;
      // setTimeout(() => {
      //   bodyRef.current.click();
      //   bodyRef.current.click();
      //   bodyRef.current.click();
      // }, timer + 220);
      turnGreenTimer = setTimeout(() => {
        body.style.backgroundColor = "rgb(50, 210, 70)";
        turnedGreen = Date.now();
      }, timer);

      isTiming = true;
      setIsStarted(true);
    }
  };

  return (
    <Fragment>
      <button className="go-back-button" onClick={goBackHandler}>
        ←
      </button>
      <div ref={bodyRef} onClick={startGame} className="basic-game-container">
        {!isStarted && isShowingAverage && (
          <Fragment>
            <p>{`Your average score is ${
              Math.floor(averageScore) - 3
            } ms !`}</p>

            <p>Press to keep practicing.</p>
          </Fragment>
        )}
        {!isStarted && isShowingScore && !isShowingAverage && (
          <p>{scores[scores.length - 1]} ms</p>
        )}
        {clickedTooEarly && <p>Clicked too early!</p>}
        {isStarted && !clickedTooEarly && (
          <p>WAIT FOR THE SCREEN TO TURN GREEN...</p>
        )}
        {!isStarted &&
          !isShowingScore &&
          !clickedTooEarly &&
          !isShowingAverage && <p>PRESS TO START</p>}
        {<p>{info}</p>}
      </div>
    </Fragment>
  );
};

export default BasicReflex;
