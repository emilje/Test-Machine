import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import "./Homepage.css";

const Homepage = function () {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="title">
        <p className="title-top">The Test</p>
        <p className="title-bottom">
          Machine<span>!</span>
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
