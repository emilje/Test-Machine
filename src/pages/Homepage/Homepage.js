import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import "./Homepage.css";

const Homepage = function () {
  const navigate = useNavigate();

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
      </div>
    </Fragment>
  );
};

export default Homepage;
