import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../../common_components/Button/Button";
import ExistRoom from "./ExistRoom/ExistRoom";
import useAuth from "../../../common_components/CustomHooks/useAuth";
import useFindRoom from "../../../common_components/CustomHooks/useFindRoom";
import { ApiErrorContext } from "../../../common_components/ApiErrorContext/ApiErrorContextProvider";
import { joinRoomService } from "../service/service";
import {
  generateKey,
  handleScroll,
  createUrlWithQueryString,
} from "../../../utils/utilities";
import { en } from "../../../utils/language";
import constants from "../../../utils/constants";
import { routePath } from "../../../router/router";

import "../Room.scss";

const FindRooms = ({ handleClose }) => {
  const { setAPIError } = useContext(ApiErrorContext);
  const [isBottom, setIsBottom] = useState(false);
  const { username } = useAuth();
  const history = useHistory();

  const { isLoading, roomList, fetchExsitRooms } = useFindRoom(setAPIError);

  // Check if a list is scrolled to bottom
  const handleListScroll = (e) => {
    handleScroll(e, (_isBottom) => {
      // when reached bottom, update state and load more items.
      if (isBottom !== _isBottom) {
        if (
          !isLoading &&
          !isBottom &&
          roomList.nextRef !== null &&
          roomList.nextRef !== -1
        ) {
          fetchExsitRooms(roomList.nextRef);
        }
        setIsBottom(_isBottom);
      }
    });
  };

  // Join to a room when list item is clicked
  const handleJoinButton = async ({ roomName }) => {
    try {
      const res = await joinRoomService({ username, roomName });
      if (res.isSuccess) {
        const nextUrl = createUrlWithQueryString(routePath.chat, { roomName });
        history.push(nextUrl);
      } else {
        setAPIError(res.errorMessage);
      }
    } catch (error) {
      setAPIError(constants.joinRoomError);
    }
  };

  return (
    <div className="find-room-container">
      <div className="find-room-content">
        <div className="find-room-modal-header">
          <h3 className="find-room-modal-title">{en.FIND_ROOMS}</h3>
          <div>
            <Button
              size="xs"
              onClickEvent={handleClose}
              buttonText={en.CLOSE}
            />
          </div>
        </div>
        <div className="find-room-list" onScroll={handleListScroll}>
          {roomList?.rooms?.map((room, i) => (
            <div
              key={room?.date_created?.seconds || generateKey(i)}
              className="find-room-list-item"
            >
              <ExistRoom room={room} buttonAction={handleJoinButton} />
            </div>
          ))}

          {isLoading && <div className="nowrapp-loading-indicator"></div>}
        </div>
      </div>
    </div>
  );
};

export default FindRooms;
