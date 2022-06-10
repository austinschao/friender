import { Link } from "react-router-dom";
import UserContext from "../userContext";
import { useContext } from "react";
import ChatRoom from "../ChatRoom";

/**
 * 
 * Needs state for messages
 * Needs function to send and receive messages
 * 
 */
function ChatRoomNav() {
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/users/:username"} className="nav-link" href="#">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/users/:username/friends"} className="nav-link" href="#">
                Friends
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/users/:username/findfriends"} className="nav-link" href="#">
                Find a Friend
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/users/:username/chat"} className="nav-link" href="#">
                Chat
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/"} className="nav-link" href="#">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default ChatRoomNav;