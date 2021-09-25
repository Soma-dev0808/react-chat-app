import { useEffect, useCallback, useState, useContext } from "react";
import {
  fetchUser,
  fetchMessages,
} from "../../components/Chat/service/service";
import { ApiErrorContext } from "../ApiErrorContext/ApiErrorContextProvider";
import { routePath } from "../../router/router";
import en from "../../utils/constants";

// Get chat room information from firebase using room name.
const useChatRoomInfo = (room) => {
  // states
  const [username, setName] = useState("");
  const [messages, setMessages] = useState([]);

  // api status
  const { startOrEndCallApi, setAPIError } = useContext(ApiErrorContext);

  // fetch chat information saved in FB
  const fecthChatInfo = useCallback(async () => {
    startOrEndCallApi();

    const res1 = await fetchUser(room);
    const res2 = await fetchMessages(room);

    // if there's an error, set the error
    if (!res1.isSuccess || !res2.isSuccess) {
      const errArray = [];
      res1.errorMessage && errArray.push(res1.errorMessage);
      res2.errorMessage && errArray.push(res2.errorMessage);

      // set error messages here
      setAPIError(errArray, routePath.selectRoom);
      return;
    }

    // if there's no user added in the chat room
    if (!res1.value?.name) {
      setAPIError(en.userNotFoundInChatError, routePath.selectRoom);

      return;
    }

    const userName = res1.value.name;
    setName(userName.trim().toLowerCase());

    // set messages stored in FB
    const storedMessages = res2.value;
    setMessages((prev) => prev.concat(...storedMessages));

    startOrEndCallApi(false);
  }, [room, startOrEndCallApi, setAPIError]);

  useEffect(() => {
    if (room) {
      fecthChatInfo();
    }
  }, [room, fecthChatInfo]);

  return { username, messages, setMessages };
};

export default useChatRoomInfo;
