import { Link } from "react-router-dom";
import UserContext from "./userContext";
import { useContext } from "react";

function NavBar({ logout }) {

  // const { currentUser } = useContext(UserContext);

  const loggedOut = (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Sign Up
        </Link>
      </li>
    </ul>
  );

  const loggedIn = (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/users/:username">
          Profile
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/users/:username/friends">
          Friends
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/users/:username/matchme">
          Find a Friend
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/" onClick={logout}>
          Logout
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to={`/`} className="navbar-brand" href="#">
          Friender
        </Link>
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
          {loggedOut}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;