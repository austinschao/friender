import UserCard from "./UserCard";
import { useState, useEffect } from "react";
import userContext from "./userContext";
import { useContext } from "react";
import FrienderAPI from "./api/api";
import { randomChoice } from "./utils/utils";


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
  const { currentUser } = useContext(userContext);
  const [potentialMatches, setPotentialMatches] = useState(currentUser.potential_users);
  const [potentialMatch, setPotentialMatch] = useState(randomChoice(potentialMatches));

  useEffect(
    function getPotentialMatchesOnMount() {
      async function getPotentialMatches() {
        const potentialFriends = await FrienderAPI.getUserMatches(currentUser.username);
        setPotentialMatches(potentialFriends.potential_users);
      }
      getPotentialMatches();
    }, [potentialMatch]);


  async function handleMatch(currUsername, otherUsername) {
    await FrienderAPI.addMatch(currUsername, otherUsername);
    setPotentialMatch(randomChoice(potentialMatches));
  }

  async function handleReject(currUsername, otherUsername) {
    await FrienderAPI.addReject(currUsername, otherUsername);
    setPotentialMatch(randomChoice(potentialMatches));
  }


  return (
    <div>
      <h1>Here is your potential friend!</h1>
      <UserCard
        key={potentialMatch.username}
        user={potentialMatch}
        handleMatch={handleMatch}
        handleReject={handleReject}>
      </UserCard>
    </div>
  );
};

export default FindFriends;