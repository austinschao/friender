import UserCard from "./UserCard";

function FriendsList({ currentUser }) {
  const friends = currentUser.matched.map(friend => <UserCard key={friend.username} user={friend} />);

  return (
    <div>
      {friends}
    </div>
  );
}

export default FriendsList;;