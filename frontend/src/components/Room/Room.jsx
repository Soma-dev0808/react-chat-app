import React, { useContext } from "react";

import LoadingIndicator from "../../common_components/LoadingIndicator/LoadingIndicator";
import RoomForm from "./RoomForm/RoomForm";
import useAuth from "../../common_components/CustomHooks/useAuth";
import { ApiErrorContext } from "../../common_components/ApiErrorContext/ApiErrorContextProvider";
import { routePath } from "../../router/router";
import {
  createUrlWithQueryString,
  validateEmptyString,
} from "../../utils/utilities";
import { en } from "../../utils/language";

import "./Room.scss";

const Room = ({ history, submitAction, isJoin = true }) => {
  const {
    apiErrorStatus: { isApiLoading },
    startOrEndCallApi,
    setAPIError,
  } = useContext(ApiErrorContext);
  const { username } = useAuth();

  // validate input and submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // show loading indicator
    startOrEndCallApi();
    const roomName = e.target.roomName.value;
    if (
      username &&
      validateEmptyString([roomName], [en.REQUIRE_ROOM_NAME_ERROR], setAPIError)
    ) {
      submitAction(username, roomName, (res) => {
        if (res.isSuccess) {
          const nextUrl = createUrlWithQueryString(routePath.chat, {
            roomName,
          });
          history.push(nextUrl);
        } else {
          setAPIError(res.errorMessage);
        }
      });
    }
  };

  return (
    <>
      <RoomForm isJoin={isJoin} buttonAction={handleSubmit} />
      <LoadingIndicator isLoading={isApiLoading} />
    </>
  );
};

export default Room;
