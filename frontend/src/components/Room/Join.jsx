import React from "react";
import Room from "./Room";
import { joinRoomService } from "./service/service";

import "./Room.scss";

// Find an existing room
const Join = (props) => {
  // Find a room with user iuput
  const handleJoinRoom = async (username, roomName, handleResCB) => {
    const res = await joinRoomService({ username, roomName });
    handleResCB(res);
  };

  return <Room {...props} submitAction={handleJoinRoom} />;
};

export default Join;
