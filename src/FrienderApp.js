import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./userContext";
import FrienderAPI from "./api/api";
import jwtDecode from "jwt-decode";
import NavBar from "./routes-nav/NavBar";
import RoutesList from "./routes-nav/RoutesList";

const TOKEN_NAME = "token";

/** Manages Friender Application
 *
 * state -> currentUser {matched:[{matchedUsers}, ...], potentialMatches: [{users}, ...]}
 *       -> isLoading (boolean) | token (JWT)
 *
 * props -> none
 *
 * App -> FrienderApp -> {Browser Router, NavBar, RoutesList}
 */

function FrienderApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem(TOKEN_NAME));

  useEffect(
    function getUserOnMount() {
      async function getUser() {
        try {
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
        } catch (err) {
          if (err) {
            console.log(err, "it went here whats the error");
            localStorage.removeItem(TOKEN_NAME);
          }
        }
      }
      setIsLoading(false);
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
    const resp = await FrienderAPI.login(formData);
    setToken(resp.token);
    localStorage.setItem(TOKEN_NAME, resp.token);
  }

  /** Handles logout, removes currentUser, token, and localStorage */

  function handleLogout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_NAME);
  }
  /** Handles adding a match */
  async function handleMatch(currUsername, otherUsername) {
    await FrienderAPI.addMatch(currUsername, otherUsername);
  }
  /** Handles rejecting a match */
  async function handleReject(currUsername, otherUsername) {
    await FrienderAPI.addReject(currUsername, otherUsername);
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

  /** Handles uploading a user's profile image */

  async function uploadUserImage(username, formData) {
    console.log("IMAGE FORM DATA", formData);
    const imageFormData = new FormData();
    imageFormData.append('file', formData);
    const uploadedFile = await axios({
      method: "post",
      url: `http://localhost:3001/users/${username}/upload`,
      data: imageFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${FrienderAPI.token}`
      }
    });
    const updatedUser = await FrienderAPI.getUser(username);

    setCurrentUser(user => ({
      ...user, image_url: updatedUser.image_url
    }));
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
            uploadUserImage
          }}
        >
          <NavBar
            handleLogout={handleLogout}
          />
          <RoutesList
            handleSignup={handleSignup}
            handleLogin={handleLogin}
            handleMatch={handleMatch}
            handleReject={handleReject}
          />
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default FrienderApp;
