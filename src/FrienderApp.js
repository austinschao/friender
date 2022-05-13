import UpdateProfileForm from "./UpdateImageForm";

import { useState, useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./userContext";
import FrienderAPI from "./api";
import jwtDecode from "jwt-decode";
import NavBar from "./NavBar";
import RoutesList from "./RoutesList";

const TOKEN_NAME = "token";

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
  const [token, setToken] = useState(localStorage.getItem(TOKEN_NAME));

  useEffect(
    function getUserOnMount() {
      async function getUser() {
        if (token) {
          FrienderAPI.token = token;
          // .sub is where username is located
          const username = jwtDecode(token).sub;
          // retrieve basic userinfo from api
          const userInfo = await FrienderAPI.getUser(username);
          // retrieve matchlists from api
          const userMatches = await FrienderAPI.getUserMatches(username);
          setCurrentUser({ ...userInfo, ...userMatches });
        }
        setIsLoading(false);
      }
      getUser();
    },
    [token]
  );

  /** Make API call to sign up user */

  async function handleSignup(formData) {
    const newUserToken = await FrienderAPI.signup(formData);
    setToken(newUserToken);
    localStorage.setItem(TOKEN_NAME, newUserToken);
  }

  /** Make API call to log in user */

  async function handleLogin(formData) {
    const userToken = await FrienderAPI.login(formData);
    setToken(userToken);
    localStorage.setItem(TOKEN_NAME, userToken);
  }

  /** Handles logout, removes currentUser, token, and localStorage */

  function handleLogout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_NAME);
  }

  /** Handles updating a user's basic info */
  async function handleUserUpdate(username, formData) {
    const updatedUserInfo = await FrienderAPI.updateUser(username, formData);

    setCurrentUser((user) => ({
      ...user,
      ...updatedUserInfo,
    }));

    return updatedUserInfo;
  }

  return isLoading ? (
    <p>Loading . . .</p>
  ) : (
    <>
      <BrowserRouter>
        <UserContext.Provider
          value={{
            currentUser,
            handleUserUpdate,
          }}
        >
          <NavBar />
          <RoutesList
            handleSignup={handleSignup}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default FrienderApp;
