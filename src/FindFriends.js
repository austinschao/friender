import UserCard from "./UserCard";
import { useState, useEffect } from "react";
import userContext from "./userContext";
import { useContext } from "react";
import FrienderAPI from "./api/api";
import { debounce, randomChoice } from "./utils/utils";
import ChatRoom from "./ChatRoom";


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


  async function handleMatch(currUser, otherUser) {
    await FrienderAPI.addMatch(currUser.username, otherUser.username);
    setPotentialMatch(randomChoice(potentialMatches));
  }

  async function handleReject(currUser, otherUser) {
    await FrienderAPI.addReject(currUser.username, otherUser.username);
    setPotentialMatch(randomChoice(potentialMatches));
  }

  const handleMatchDebounce = debounce(handleMatch);


  const handleRejectDebounce = debounce(handleReject);




  return (
    <div>
      {potentialMatch ? (
        <>
          <h1>Here is your potential friend!</h1>
          <UserCard
            key={potentialMatch.username}
            user={potentialMatch}
            handleMatch={handleMatchDebounce}
            handleReject={handleRejectDebounce}>
          </UserCard>
        </>
      ) : (
        <>
          <h3>Sorry, you are out of friends in your area.</h3>
          <p>Either wait for new friends to join or expand your radius.</p>
        </>
      )}
    </div >
  );
};

export default FindFriends;