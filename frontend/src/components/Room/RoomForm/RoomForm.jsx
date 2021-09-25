import React from "react";
import StyledLink from "../../../common_components/Link/StyledLink";
import { routePath } from "../../../router/router";
import { en } from "../../../utils/language";

import "../Room.scss";

const RoomForm = ({ isJoin, buttonAction }) => {
  const formTitle = isJoin ? en.JOIN_ROOM_TITLE : en.LAUNCH_ROOM_TITLE;
  const buttonTitle = isJoin
    ? en.JOIN_ROOM_BUTTON_TITLE
    : en.LAUNCH_ROOM_BUTTON_TITLE;
  const roomLink = isJoin ? routePath.createRoom : routePath.selectRoom;
  const roomLinkTitle = isJoin
    ? en.JOIN_ROOM_LINK_TITLE
    : en.LAUNCH_ROOM_LINK_TITLE;
  return (
    <div className="join-outer-container">
      <div className="join-inner-container">
        <h1 className="heading">{formTitle}</h1>
        <form className="join-inner-form" onSubmit={buttonAction}>
          <div>
            <input
              name="roomName"
              placeholder={en.ROOMNAME_PLACEHOLDER}
              className="join-input mt-20"
              type="text"
            />
          </div>

          <button className="button mt-20">{buttonTitle}</button>
        </form>

        <StyledLink to={roomLink} title={roomLinkTitle} />
      </div>
    </div>
  );
};

export default RoomForm;
