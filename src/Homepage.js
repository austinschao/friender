import React, { useContext } from "react";
import UserContext from "./userContext";
import { NavLink } from "react-router-dom";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="homepage">
      <div className="col-12">
        <h1 className="homepage-title display-1 fw-bolder pb-5">
          <strong>Friender</strong>
        </h1>
        <h3 className="homepage-text fw-bolder pt-4 mt-4">
          Your new friends are waiting . . .
        </h3>
        {currentUser ? (
          <h4 className="homepage-text fw-bolder">
            Welcome Back, {currentUser.first_name}!
          </h4>
        ) : (
          <>
            <button className="btn btn-outline-secondary mx-1">
              <NavLink to={`/login`} style={{ textDecoration: "none" }}>
                Login
              </NavLink>
            </button>
            <button className="btn btn-outline-primary mx-1">
              <NavLink to={`/signup`} style={{ textDecoration: "none" }}>
                Signup
              </NavLink>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Homepage;
