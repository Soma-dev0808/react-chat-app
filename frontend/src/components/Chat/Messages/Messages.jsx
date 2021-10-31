import React, { useRef, useEffect, useState } from "react";
import Message from "./Message/Message";

import {
  classNames,
  generateKey,
  convertTsToTime,
  handleScroll,
  scrollToBottom,
} from "../../../utils/utilities";

import "./Messages.scss";

let prevDate = "";

const Messages = ({ messages, name }) => {
  const [isBottom, setIsBottom] = useState(true);
  const bottomRef = useRef();

  useEffect(() => {
    scrollToBottom(bottomRef, { behavior: "smooth" });
  }, [messages]);

  // Observe sroll event and check if user scrolled to bottom
  const handleOnScroll = (e) => {
    handleScroll(e, (_isBottom) => {
      // when reached bottom, update state.
      if (isBottom !== _isBottom) {
        setIsBottom(_isBottom);
      }
    });
  };

  const handleScrollButtonClick = () => {
    scrollToBottom(bottomRef, { behavior: "smooth" });
  };

  return (
    <>
      <div className="messages" onScroll={handleOnScroll}>
        {messages.map((message, i) => {
          let dateLabel = "";

          if (typeof message?.timeStamp === "object") {
            const ts = message.timeStamp;

            const convertedTime = convertTsToTime(ts);
            message.timeStamp = convertedTime;

            // Set date information.
            const _timeStamp = new Date(ts?.toDate())?.toLocaleDateString();
            if (prevDate !== _timeStamp) {
              dateLabel = _timeStamp;
              prevDate = dateLabel;
            }
          }

          return (
            <div key={message.id || generateKey(i)}>
              <Message message={message} name={name} dateLabel={dateLabel} />
            </div>
          );
        })}
        <div ref={bottomRef} />
        <ScrollToBottomButton
          scrollToBottom={handleScrollButtonClick}
          isBottom={isBottom}
        />
      </div>
    </>
  );
};

const ScrollToBottomButton = ({ scrollToBottom, isBottom }) => {
  return (
    <button
      onClick={scrollToBottom}
      className={classNames(
        "scroll-to-bottom-button",
        { "show-bottom-button": !isBottom },
        { "hide-bottom-button": isBottom }
      )}
    />
  );
};

export default Messages;
