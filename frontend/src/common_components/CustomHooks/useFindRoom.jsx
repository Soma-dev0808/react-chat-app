import { useEffect, useCallback, useState } from "react";
import { fetchRoomList } from "../../components/Room/service/service";

const listFetchLimit = 10;
const initialState = {
  rooms: [],
  nextRef: null,
};

const useFindRoom = (setAPIError) => {
  const [isLoading, setIsLoading] = useState(false);
  const [roomList, setRoomList] = useState(initialState);

  // Fetch rooms which user can choose
  const fetchExsitRooms = useCallback(
    async (nextRef) => {
      setIsLoading(true);
      const res = await fetchRoomList(listFetchLimit, nextRef);
      if (res.isSuccess) {
        const { roomList, nextRef } = res.value;
        setRoomList((prevState) => ({
          rooms: prevState.rooms.concat(roomList),
          nextRef: nextRef,
        }));
        setIsLoading(false);
      } else {
        setAPIError(res.errorMessage);
      }
    },
    [setAPIError]
  );

  // Initial load when dialog is opened
  useEffect(() => {
    if (roomList.nextRef === null) {
      fetchExsitRooms(roomList.nextRef);
    }
  }, [fetchExsitRooms, roomList.nextRef]);

  // unset roomList when unmounting
  useEffect(() => {
    const resetState = () => {
      setRoomList(initialState);
    };
    return () => resetState();
  }, []);

  return { isLoading, roomList, fetchExsitRooms };
};

export default useFindRoom;
