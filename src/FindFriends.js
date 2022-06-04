import UserCard from "./UserCard";
import { useState } from "react";
import userContext from "./userContext";
import { useContext } from "react";
import FrienderAPI from "./api/api";


/** Manages list of potential friends you can match with
 *
 * If user wants to match with them, add to hope to match with API
 *
 * If user rejects them, add to rejected persons with API
 *
 * state -> potentialMatches [{potential1}, {potential2}, ...]
 *
 * props -> none
 *
 * FrienderApp -> Home -> FindFriends
 */

function FindFriends() {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [potentialMatches, setPotentialMatches] = useState(currentUser.potential_users);

  // Need useEffect to fix list of potentialMatches when a user swipes left or right
  // Need algo to randomize which person user sees at a time
  // should cause useEffect for requesting new data on currentUser again from API...

  async function handleMatch(currUsername, otherUsername) {
    await FrienderAPI.addMatch(currUsername, otherUsername);
  }

  async function handleReject(currUsername, otherUsername) {
    await FrienderAPI.addReject(currUsername, otherUsername);
  }

  const potentialFriends = currentUser.potential_users.map((friend) => (
    <UserCard key={friend.username} user={friend} handleMatch={handleMatch} handleReject={handleReject} />
  ));

  return (
    <div>
      <h1>Here are your potential friends!</h1>
      {potentialFriends}
    </div>
  );
};

export default FindFriends;