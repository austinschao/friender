import UpdateProfileForm from "./UpdateProfileForm";

import { useState, useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./userContext";
import FrienderAPI from "./api";
import jwtDecode from "jwt-decode";
import NavBar from "./NavBar";


const TOKEN = "token";

/**
 *
 * state -> currentUser {matched:[{matchedUsers}, ...], potentialMatches: [{users}, ...]}
 *
 * props
 *
 *
 */
function FrienderApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem(TOKEN));

  useEffect(
    function getUserOnMount() {
      async function getUser() {
        if (token) {
          FrienderAPI.token = token;
          const username = jwtDecode(token).username;
          const userInfo = await FrienderAPI.getUser(username);
          // want an array of job objects. we have array of job ids
          const jobPromises = userInfo.applications.map((id) =>
            FrienderAPI.getJob(id)
          );
          const jobs = await Promise.all(jobPromises);
          setUser({
            ...userInfo,
            applications: new Set(userInfo.applications),
            jobs,
          });
        }
        setLoaded(true);
      }
      getUser();
    },
    [token]
  );

  return (
    <>
      <NavBar />
      <h1>Main App</h1>
      <UpdateProfileForm />
    </>
  );
}

export default FrienderApp;
