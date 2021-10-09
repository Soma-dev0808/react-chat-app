import React from "react";

import "./Message.scss";

const Messsage = ({ message: { user, text, timeStamp }, name, dateLabel }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  const dateLabelComp =
    dateLabel !== "" ? (
      <div className="date-label-container">
        <span className="date-label">{dateLabel}</span>
      </div>
    ) : null;

  const timestamp = timeStamp ? <p className="sent-time">{timeStamp}</p> : null;

  return isSentByCurrentUser ? (
    <>
      {dateLabelComp}
      <div className="message-container justify-end">
        <div className="pr-10 sent-info sent-info-me">
          <p className="sent-text">{trimmedName}</p>
          {timestamp}
        </div>
        <div className="message-box background-blue">
          <p className="message-text color-white">{text}</p>
        </div>
      </div>
    </>
  ) : (
    <>
      {dateLabelComp}
      <div className="message-container justify-start">
        <div className="message-box background-light">
          <p className="message-text color-dark">{text}</p>
        </div>
        <div className="pl-10 sent-info sent-info-other">
          <p className="sent-text">{user}</p>
          {timestamp}
        </div>
      </div>
    </>
  );
};

export default Messsage;
