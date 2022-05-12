import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./userContext";
import Homepage from "./Homepage";
import Profile from "./Profile";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";
import FriendsList from "./FriendsList";
import FindFriends from "./FindFriends";

function RoutesList({ login, signup, currentUser }) {
  return (
    <div className="pt-5">
      <Routes>
        {!currentUser && (
          <>
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
          </>
        )}

        <Route path="/" element={<Homepage />} />

        {currentUser && (
          <>
            <Route path="/users/:username" element={<Profile />} />
            <Route path="/users/:username/friends" element={<FriendsList />} />
            <Route path="/companies/:handle" element={<FindFriends />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default RoutesList;
