import React from "react";
import { en } from "../../utils/language";

import "./Input.scss";

const Input = ({ message, handleInput, sendMessage }) => (
  <form className="chat-input-form" onSubmit={sendMessage}>
    <input
      className="chat-input"
      type="text"
      placeholder="Type a messag ..."
      value={message}
      onChange={handleInput}
    />
    <button className="sendButton">{en.SEND}</button>
  </form>
);

export default Input;
