import UpdateProfileForm from "./UpdateProfileForm";

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
          const username = jwtDecode(token).username;
          const userInfo = await FrienderAPI.getUser(username);

          setCurrentUser({
            ...userInfo,
          });
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

  return isLoading ? (
    <p>Loading . . .</p>
  ) : (
    <>
      <BrowserRouter>
        <UserContext.Provider
          value={{
            currentUser,
            handleSignup,
            handleLogin,
          }}
        >
          <NavBar />
          <RoutesList />
        </UserContext.Provider>
      </BrowserRouter>

      <UpdateProfileForm />
    </>
  );
}

export default FrienderApp;
