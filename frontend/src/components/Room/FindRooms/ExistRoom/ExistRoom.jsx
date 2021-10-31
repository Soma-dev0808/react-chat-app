import React from "react";
import Button from "../../../../common_components/Button/Button";
import { en } from "../../../../utils/language";

const ExistRoom = ({ room, buttonAction }) => {
  const handleButtonClick = () => {
    if (room?.roomName) {
      buttonAction({ roomName: room.roomName });
    }
  };
  return (
    <>
      <div className="find-room-info">
        <div>Room Name: {room?.roomName}</div>
        <div>People: {room?.users?.length}</div>
      </div>
      <div className="find-room-join-button">
        <Button
          buttonText={en.JOIN_TITLE}
          size="sm"
          primary
          onClickEvent={handleButtonClick}
        />
      </div>
    </>
  );
};

export default ExistRoom;
