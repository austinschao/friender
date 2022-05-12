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

          setCurrentUser({
            ...userInfo
          });
        }
        setIsLoading(false);
      }
      getUser();
    },
    [token]
  );

  return isLoading ? (<p>Loading . . .</p>) : (
    <>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>

      <UpdateProfileForm />
    </>
  );
}

export default FrienderApp;
