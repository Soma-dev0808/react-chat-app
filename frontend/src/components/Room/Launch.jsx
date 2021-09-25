import React from "react";

import Room from "./Room";
import { launchRoomService } from "./service/service";

import "./Room.scss";

// Create a new room
const Launch = (props) => {
  // create a new room with user iuput
  const handleLaunchRoom = async (username, roomName, handleResCB) => {
    const res = await launchRoomService({ username, roomName });
    handleResCB(res);
  };

  return <Room {...props} submitAction={handleLaunchRoom} isJoin={false} />;
};

export default Launch;
