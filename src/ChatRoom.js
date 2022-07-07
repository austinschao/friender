/**
 * Create a card container.
 * Top portion of the card will display text messages.
 *    Top portion will have a fixed length and will become a scroll after multiple
 *    messages.
 *    The top portion will only show show many messages, will use pagination to
 *    display more old messages
 * Lower portion will be a text area that will have a button to send
 *    The send button will handle sending message and adding to DB
 */
import React from "react";

function ChatRoom({ handleMessage, handleMessageChange, messages, message }) {

  return (
    <div className="card" style={{ "width": "18rem" }}>
      <div className="card-body">
        {messages.length > 0 &&
          messages.map((msg, i) => (
            <div key={i}>
              <p>{msg}</p>
            </div>
          ))}
        <div>
          <input type="textarea" id="text-area" value={message} onChange={evt => handleMessageChange(evt)} />
          {/* // <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea> */}
          < button id="send-message" onClick={handleMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;