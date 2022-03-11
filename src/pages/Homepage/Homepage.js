import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Homepage.css";

const body = document.body;

const Homepage = function () {
  const navigate = useNavigate();

  useEffect(() => {
    body.style.backgroundColor = "rgb(50, 140, 205)";
    body.style.overflow = "";
  }, []);

  return (
    <Fragment>
      <div className="title">
        <p className="title-top">Welcome to the</p>
        <p className="title-bottom">
          WEB LAB<span>!</span>
        </p>
        <p className="title-smallprint">
          Where dreams probably don't come true.
        </p>
      </div>
      <div className="homepage-container">
        <p>Welcome!</p>
        <p>Select one of the games below.</p>
        <button onClick={() => navigate("/basicgame")}>REACTION TIME.</button>
        <button onClick={() => navigate("/aimreflex")}>
          AIM REACTION TIME.
        </button>
        <button onClick={() => navigate("/soundreflex")}>
          SOUND REACTION TIME.
        </button>
      </div>
    </Fragment>
  );
};

export default Homepage;
