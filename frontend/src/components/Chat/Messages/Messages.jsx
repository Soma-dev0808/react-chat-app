import React, { useRef, useEffect, useState, useCallback } from "react";
import Message from "./Message/Message";

import {
  classNames,
  generateKey,
  convertTsToTime,
} from "../../../utils/utilities";

import "./Messages.scss";

let prevDate = "";

const Messages = ({ messages, name }) => {
  const [isBottom, setIsBottom] = useState(true);
  const bottomRef = useRef();

  // go to bottom of chat when page was refreshed or go to bottom button was clicked
  const scrollToBottom = useCallback(() => {
    if (bottomRef.current?.scrollIntoView) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bottomRef]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Observe sroll event and check if user scrolled to bottom
  const handleOnScroll = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;

    if (scrollHeight && scrollTop && clientHeight) {
      const _isBottom = scrollHeight - scrollTop <= clientHeight + 5;
      // when reached bottom, update state.
      if (isBottom !== _isBottom) {
        setIsBottom(_isBottom);
      }
    }
  };

  return (
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
        scrollToBottom={scrollToBottom}
        isBottom={isBottom}
      />
    </div>
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
