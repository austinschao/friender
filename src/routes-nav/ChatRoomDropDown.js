/** Displays the name of each room from current user's list of rooms
 *  State: none
 *  Props: joinRoom, leaveRoom, rooms
 */
function ChatRoomDropDown({ roomNames }) {
  return (
    <div className="dropdown">
      <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Chat Rooms
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {roomNames.map((room, i) => (
          <li key={i}>{room}</li>
        ))}
      </ul>
    </div >
  );
}

export default ChatRoomDropDown;