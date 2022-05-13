import UserCard from "./UserCard";
/** Manages list of friends you have successfully matched with
 *
 * state
 *
 * props -> currentUser
 */
function FriendsList({ currentUser }) {
  const friends = currentUser.matched.map(friend => <UserCard key={friend.username} user={friend} />);

  return (
    <div>
      {friends}
    </div>
  );
}

export default FriendsList;;