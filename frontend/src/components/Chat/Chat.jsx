import React, { useState, useEffect, useContext } from "react";
import { Prompt } from "react-router-dom";
import io from "socket.io-client";

import InfoBar from "./InfoBar/InfoBar";
import Input from "./Input/Input";
import Messages from "./Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import LoadingIndicator from "../../common_components/LoadingIndicator/LoadingIndicator";

import useChatRoomInfo from "../../common_components/CustomHooks/useChatRoomInfo";
import useRoomName from "../../common_components/CustomHooks/useRoomName";
import { saveMessages } from "./service/service";
import { ApiErrorContext } from "../../common_components/ApiErrorContext/ApiErrorContextProvider";
import { en } from "../../utils/language";

import "./Chat.scss";

const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT;
let socket;

const Chat = (props) => {
  const {
    apiErrorStatus: { isApiLoading },
    setAPIError,
  } = useContext(ApiErrorContext);
  // states
  const [users, setUsers] = useState();
  const [message, setMessage] = useState("");

  const { room } = useRoomName(props);
  const { username, messages, setMessages } = useChatRoomInfo(room);

  // Start session
  useEffect(() => {
    socket = io(ENDPOINT);
    if (username && room) {
      socket.emit(en.SOCKET_JOIN, { username, room }, (err) => {
        if (err) {
          setAPIError(err.err);
        }
      });
    }
  }, [username, room, setAPIError]);

  // Start listening message from server and room data
  useEffect(() => {
    if (username) {
      socket.on(en.SOCKET_MESSAGE, (message) => {
        setMessages((prev) => prev.concat(message));
      });

      socket.on(en.SOCKET_ROOM_DATA, ({ users }) => {
        setUsers(users);
      });
    }
  }, [username, setMessages]);

  useEffect(() => {
    window.onbeforeunload = function (e) {
      e.preventDefault();
      socket.emit(en.SOCKET_DISSCONNECTED);
      socket.off();
    };

    // clean up
    return () => {
      socket.emit(en.SOCKET_DISSCONNECTED);
      socket.off();
      window.onbeforeunload = null;
    };
  }, []);

  // send input message
  const sendMessage = async (event) => {
    event.preventDefault();
    if (message && room && username) {
      socket.emit(en.SOCKET_SEND_MESSAGE, message, (err) => {
        if (err) {
          setAPIError(err);
        } else {
          setMessage("");
        }
      });
      const res = await saveMessages({ message, room, username });
      if (!res?.isSuccess) {
        setAPIError(res?.errorMessage);
      }
    }
  };

  const handleInput = (e) => {
    const inputValue = e.target.value;
    setMessage(inputValue);
  };

  return (
    <>
      <div className="outer-container">
        <TextContainer users={users} />
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={username} />
          <Input
            message={message}
            handleInput={handleInput}
            sendMessage={sendMessage}
          />
        </div>
      </div>
      <LoadingIndicator isLoading={isApiLoading} />
      <Prompt message={en.CONFIRM_LEAVE_PAGE_MESSAGE} />
    </>
  );
};

export default Chat;
