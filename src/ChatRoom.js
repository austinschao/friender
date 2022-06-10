import React from "react";
import { Socket } from "socket.io-client";
import UserContext from "./userContext";

function ChatRoom({ privateSocket, socket }) {
  // create state using hooks
  const { currentUser, token } = React.useContext(UserContext);
  const [messages, setMessages] = React.useState([]);
  // const [message, setMessage] = React.useState("");
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
    sendUsername();
  }, []);


  // Connect user to chat
  // socket.on('connect', () => {
  //   console.log("it connected");
  //   privateSocket.emit('username', { username: currentUser.username, token: token });
  //   socket.send({ username: currentUser.username, message: `${currentUser.username} has connected.` });
  // });

  function sendUsername() {
    privateSocket.emit('username', { username: currentUser.username, token: token });
  }

  privateSocket.on('new_private_message', msg => {
    console.log(msg);
    setMessages([...messages, msg]);
  });

  socket.on("message", msg => {
    setMessages([...messages, msg]);
  });

  privateSocket.on('room_name', rooms => {
    console.log(rooms);
    setRoomNames([...roomNames, ...rooms]);
  });

  // socket.on("message", msg => {
  //   console.log("it went here after???");
  //   setMessages([...messages, msg]);
  // });

  // This method will call when first time app render and
  // Everytime message length changes
  // Each time a new message is created, it will add to the list of messages

  // function getMessages() {
  //   // If console.log is in here, it would console 9 times each time message is added
  //   socket.on("message", msg => {
  //     setMessages([...messages, msg]);
  //   });
  // }

  function handleMessage(evt) {
    const [message] = evt.target.value;
    socket.send({ message: message, username: currentUser.username, room: currRoom });
  }

  function handlePrivateMsgChange(evt) {
    setPrivateMessage(evt.target.value);
  }

  function handleSendToUser(evt) {
    setSendToUser(evt.target.value);
  }

  function handlePrivateMessage() {
    if (privateMessage !== "" && sendToUser !== "") {
      privateSocket.emit('private_message', { sender: currentUser.username, receiver: sendToUser, message: privateMessage });
      setMessages([...messages, `${currentUser.username}: ${privateMessage}`]);
      setPrivateMessage("");
      setSendToUser("");
    } else {
      alert("Please list the receiver's username or add a message");
    }
  }

  function printSysMsg(message) {
    setMessages([...messages, message]);
  }

  function handleJoin(evt) {
    const [room] = evt.target.value;
    console.log(evt);
    if (room === currRoom) {
      let message = `You are already in ${room} room.`;
      printSysMsg(message);
    } else {
      leaveRoom(currRoom);
      joinRoom(room);
    }
  }

  function joinRoom(room) {
    setCurrRoom(room);
    Socket.emit('join', { username: currentUser.username, room: room });
  }

  function leaveRoom(room) {
    Socket.emit('leave', { username: currentUser.username, room: currRoom });
  }


  return (
    <div>
      <h1>Welcome to the chat!</h1>
      {/* Display Room Selection */}
      {/* <div>
        <h4>Rooms</h4>
        <ul>
          {roomNames.length > 0 && roomNames.map((room, i) => (
            <li key={i} onClick={evt => handleJoin(evt)}>{room}</li>
          ))}
        </ul>
      </div> */}
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

export default ChatRoom;