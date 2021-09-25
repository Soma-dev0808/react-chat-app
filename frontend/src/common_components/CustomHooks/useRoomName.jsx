import { useEffect, useState } from "react";
import { routePath } from "../../router/router";
import { retrieveQsObjProp } from "../../utils/utilities";

const useRoomName = ({ location, history }) => {
  const [room, setRoom] = useState("");

  useEffect(() => {
    if (!location || !history) return;
    // get room name from url and use it
    const parsedObj = retrieveQsObjProp({ location });
    if (!parsedObj) {
      return history.push(routePath.selectRoom);
    }
    const { roomName } = parsedObj;
    setRoom(roomName);
  }, [location, history]);

  return { room };
};

export default useRoomName;
