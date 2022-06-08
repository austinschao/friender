import React from "react";
import io from "socket.io-client";
import UserContext from "./userContext";
import FrienderAPI from "./api/api";

// connect with server using socket io
let socket = io.connect("http://localhost:3001");


//name space for messages
let socket_messages = io(`http://localhost:3001/messages`);

//name space for private messages
let private_socket = io(`http://localhost:3001/private`);


function ChatRoom() {
  // create state using hooks
  const { currentUser } = React.useContext(UserContext);
  const [messages, setMessages] = React.useState([
  ]);
  const [message, setMessage] = React.useState("");
  // const [username, setUsername] = R



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
    getMessages();
  }, [messages.length]);

  // Connect user to chat

  // React.useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log("it went here");
  //     socket.send(`${currentUser.username} has connected`);
  //   });
  // });

  socket_messages.on('from flask', function (msg) {
    alert(msg);
  });

  socket.on('server originated', function (msg) {
    alert(msg);
  });

  // This method will call when first time app render and
  // Everytime message length changes
  // Each time a new message is created, it will add to the list of messages

  function getMessages() {
    socket.on("message", msg => {
      setMessages([...messages, msg]);
    });
  }

  // On change input field will call
  function handleChange(evt) {
    setMessage(evt.target.value);
  }

  // when send button pressed this method called
  function handleMessage() {
    if (message !== "") {
      // when btn clicked emit the message to server
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please add a message");
    }
  }

  function handleUsername(evt) {
    if (evt.target.previousSibling.value !== "") {
      private_socket.emit('username', evt.target.previousSibling.value);
      evt.target.previousSibling.value = "";
    } else {
      console.log(evt);
      alert("Please add a username");
    }
  }


  return (
    <div>
      {/*display each and every message in the state as a for loop */}
      <h1>Welcome to the chat!</h1>
      {messages.length > 0 &&
        messages.map(msg => (
          <div>
            <p>{currentUser.username}: {msg}</p>
          </div>
        ))}
      {/*input field */}
      <div>
        <input value={message} name="message" onChange={evt => handleChange(evt)} />
        {/* BTN */}
        <button onClick={() => handleMessage()}>Send Message</button>
      </div>
      <div>
        <input type="text" id="username" />
        <button id="send_username" onClick={(evt) => handleUsername(evt)}>Send Username</button>
      </div>
    </div>
  );
}

export default ChatRoom;