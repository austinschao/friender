import { NavLink } from "react-router-dom";
import UserContext from "../userContext";
import { useContext } from "react";

function NavBar({ handleLogout }) {
  const { currentUser } = useContext(UserContext);

  const loggedOut = (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <NavLink to={"/login"} className="nav-link" href="#">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/signup"} className="nav-link" href="#">
          Sign Up
        </NavLink>
      </li>
    </ul>
  );

  const loggedIn = (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <NavLink to={`/${currentUser?.username}}/profile`} className="nav-link" href="#">
          Profile
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/${currentUser?.username}/friends`} className="nav-link" href="#">
          Friends
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/${currentUser?.username}/findfriends`} className="nav-link" href="#">
          Find a Friend
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/${currentUser?.username}/chat`} className="nav-link" href="#">
          Chat
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/"} onClick={handleLogout} className="nav-link" href="#">
          Logout
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink to={`/`} className="navbar-brand" href="#">
          Friender
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor03">
          {currentUser ? loggedIn : loggedOut}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
