import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "../Homepage";
import UserProfile from "../UserProfile";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignUpForm";
import FriendsList from "../FriendsList";
import FindFriends from "../FindFriends";
import { useContext } from "react";
import UserContext from "../userContext";
import ChatRoom from "../ChatRoom";

function RoutesList({ handleLogin, handleSignup, privateSocket }) {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="pt-5">
      <Routes>
        {!currentUser && (
          <>
            <Route
              path="/login"
              element={<LoginForm handleLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={<SignupForm handleSignup={handleSignup} />}
            />
          </>
        )}

        <Route path="/" element={<Homepage />} />

        {currentUser && (
          <>
            <Route path="/users/:username" element={<UserProfile />} />
            <Route path="/users/:username/friends" element={<FriendsList currentUser={currentUser} />} />
            <Route path="/users/:username/findfriends" element={<FindFriends currentUser={currentUser} />} />
            <Route path="/users/:username/chat" element={<ChatRoom currentUser={currentUser} privateSocket={privateSocket} />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default RoutesList;
