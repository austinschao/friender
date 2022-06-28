import React from "react";
import UserContext from "./userContext";

function ChatRooms({ privateSocket, socket }) {
  const { currentUser, token } = React.useContext(UserContext);
  const [messages, setMessages] = React.useState([]);
  const [privateMessage, setPrivateMessage] = React.useState("");
  const [sendToUser, setSendToUser] = React.useState("");
  const [currRoom, setCurrRoom] = React.useState("");
  const [roomNames, setRoomNames] = React.useState([]);


  // component update method as hook (useEffect)
  // will auto call when message length changes

  // React.useEffect(
  //   function getMessagesOnMount() {
  //     async function getMessages() {
  //       const { messages } = await FrienderAPI.getMessages(currentUser.username);
  //       socket.on("message", msg => {
  //         setMessages([...messages, msg]);
  //       });
  //     }
  //     getMessages(0);
  //   }[messages.length]
  // );

  React.useEffect(() => {
    function sendUsername() {
      privateSocket.emit('username', { username: currentUser.username, token: token });
    }
    sendUsername();
  }, []);

  /** Event listener for new_private_message from privateSocket. Adds new messages to previous messages
   */
  privateSocket.on('new_private_message', msg => {
    console.log(msg);
    setMessages([...messages, msg]);
  });

  /** Event listener for message. Sets the message to the incoming message
   * currently not being used
  */
  // socket.on("message", msg => {
  //   setMessages([...messages, msg]);
  // });

  /** Event listener for room_name from privateSocket. Sets incoming room names to previous room names */
  privateSocket.on('room_name', rooms => {
    console.log(rooms);
    setRoomNames(prevRoom => [...prevRoom, ...rooms]);
  });

  /** Sends message to the private room */
  function handleMessage(evt) {
    const [message] = evt.target.value;
    socket.send({ message: message, username: currentUser.username, room: currRoom });
  }

  /** Gathers message to be sent to other user */
  function handlePrivateMsgChange(evt) {
    setPrivateMessage(evt.target.value);
  }

  /** Gathers username for whom to send message to */
  function handleSendToUser(evt) {
    setSendToUser(evt.target.value);
  }

  /** Sends the message to other user
   *  If no username/message is provided, alerts a message
   */
  function handlePrivateMessage() {
    if (privateMessage !== "" && sendToUser !== "") {
      privateSocket.emit('private_message', { sender: currentUser.username, receiver: sendToUser, message: privateMessage });
      setMessages(prevMessages => [...prevMessages, `${currentUser.username}: ${privateMessage}`]);
      setPrivateMessage("");
      setSendToUser("");
    } else {
      alert("Please list the receiver's username or add a message");
    }
  }

  /** Adds to message history that you have joined a room */
  function printSysMsg(message) {
    setMessages(prevMessages => [...prevMessages, message]);
  }

  /** Allows a user to join another room */
  function handleJoin(evt) {
    console.log(evt, "EVT");
    const [room] = evt.target.innerText;
    if (room === currRoom) {
      let message = `You are already in ${room} room.`;
      printSysMsg(message);
    } else {
      leaveRoom(currRoom);
      joinRoom(room);
    }
  }

  /** Sets currRoom to room that is clicked. Sends message to backend notifying of the join */
  function joinRoom(room) {
    setCurrRoom(room);
    socket.emit('join', { username: currentUser.username, room: room });
  }

  /** Sets currRoom to "". Sends message to backend notifying of the leave */
  function leaveRoom(room) {
    setCurrRoom("");
    socket.emit('leave', { username: currentUser.username, room: currRoom });
  }


  return (
    <div>
      <h1>Welcome to the chat!</h1>
      {/* Display Room Selection */}
      <h4>Rooms</h4>
      {roomNames.length > 0 && roomNames.map((room, i) => (
        <nav key={i} onClick={evt => handleJoin(evt)}>{room}</nav>
      ))}
      {messages.length > 0 &&
        messages.map((msg, i) => (
          <div key={i}>
            <p>{msg}</p>
          </div>
        ))}
      <div>
        {/* Private Message */}
        <div>
          <label htmlFor="send-to">Send To:
            <input type="text" name="sendToUser"
              value={sendToUser}
              onChange={evt => handleSendToUser(evt)} />
          </label>
          <label htmlFor="private-msg">
            <input type="text" id="private-msg" name="privateMessage"
              value={privateMessage}
              onChange={evt => handlePrivateMsgChange(evt)} />
          </label>
          <button id="send_private_message"
            onClick={handlePrivateMessage}>Send</button>
        </div>
      </div>
    </div >
  );
}

export default ChatRooms;