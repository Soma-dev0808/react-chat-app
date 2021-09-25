import { db, auth } from "../../../service/firebase";
import {
  convertFBApiResponse,
  retrieveFBErrorMessage,
} from "../../../utils/utilities";
import en from "../../../utils/constants";

// Create a new room
export async function launchRoomService({ username, roomName }) {
  const checkRoom = await db.collection(en.rooms).doc(roomName).get();

  // room is already exists
  if (checkRoom.exists) {
    return convertFBApiResponse(false, en.roomAlreadyExixtsError);
  }

  return db
    .collection(en.rooms)
    .doc(roomName)
    .set({
      users: [
        {
          name: username,
          email: auth.currentUser.email,
        },
      ],
      roomName,
    })
    .then(() => convertFBApiResponse())
    .catch((err) => convertFBApiResponse(false, retrieveFBErrorMessage(err)));
}

export async function joinRoomService({ username, roomName }) {
  try {
    const checkRoom = await db.collection(en.rooms).doc(roomName).get();

    // There's no room found
    if (!checkRoom.exists) {
      return convertFBApiResponse(false, en.roomNotExsistsError);
    }

    const usersArray = await checkRoom.data().users;

    const user = await checkRoom
      .data()
      .users.find((user) => user.email === auth.currentUser.email);

    // Check if user already joined the room before
    // If not, redirect to select user name page
    if (user) {
      return convertFBApiResponse();
    } else {
      return db
        .collection(en.rooms)
        .doc(roomName)
        .set({
          users: [
            ...usersArray,
            {
              name: username,
              email: auth.currentUser.email,
            },
          ],
          roomName,
        })
        .then(() => convertFBApiResponse())
        .catch((err) =>
          convertFBApiResponse(false, retrieveFBErrorMessage(err))
        );
    }
  } catch (error) {
    return convertFBApiResponse(false, retrieveFBErrorMessage(error));
  }
}
