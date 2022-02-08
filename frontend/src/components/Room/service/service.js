import firebase from "firebase/app";
import { db, auth } from "../../../service/firebase";
import {
  convertFBApiResponse,
  retrieveFBErrorMessage,
} from "../../../utils/utilities";
import { en } from "../../../utils/language";

// Fetch existing room list
export async function fetchRoomList(listFetchLimit, nextRef) {
  const roomList = [];
  // if there's nextRef, add startAfter
  const currList = nextRef
    ? db
        .collection(en.ROOMS)
        .orderBy(en.DATE_CREATED)
        .startAfter(nextRef)
        .limit(listFetchLimit)
    : db.collection(en.ROOMS).orderBy(en.DATE_CREATED).limit(listFetchLimit);

  try {
    const snapshot = await currList.get();
    if (snapshot.empty) {
      return convertFBApiResponse(true, { roomList, nextRef: -1 });
    }

    snapshot.docs.forEach((item) => {
      if (item.exists) {
        roomList.push(item.data());
      }
    });

    // if data in firestore is less than 10, should stop fetch next time
    const lastFetchedItem =
      snapshot.docs.length === listFetchLimit
        ? snapshot.docs[snapshot.docs.length - 1]
        : -1;
    return convertFBApiResponse(true, { roomList, nextRef: lastFetchedItem });
  } catch (err) {
    return convertFBApiResponse(false, retrieveFBErrorMessage(err));
  }
}

// Create a new room
export async function launchRoomService({ username, roomName }) {
  const checkRoom = await db.collection(en.ROOMS).doc(roomName).get();

  // room is already exists
  if (checkRoom.exists) {
    return convertFBApiResponse(false, en.ROOM_ALREADY_EXISTS_ERROR);
  }

  return db
    .collection(en.ROOMS)
    .doc(roomName)
    .set({
      users: [
        {
          name: username,
          email: auth.currentUser.email,
        },
      ],
      roomName,
      date_created: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => convertFBApiResponse())
    .catch((err) => convertFBApiResponse(false, retrieveFBErrorMessage(err)));
}

export async function joinRoomService({ username, roomName }) {
  try {
    const checkRoom = await db.collection(en.ROOMS).doc(roomName).get();

    // There's no room found
    if (!checkRoom.exists) {
      return convertFBApiResponse(false, en.ROOM_NOT_EXISTS_ERROR);
    }

    const usersArray = await checkRoom.data().users;
    const dateCreated = await checkRoom.data().date_created;

    const user = await checkRoom
      .data()
      .users.find((user) => user.email === auth.currentUser.email);

    // Check if user already joined the room before
    // If not, redirect to select user name page
    if (user) {
      return convertFBApiResponse();
    } else {
      return db
        .collection(en.ROOMS)
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
          date_created: dateCreated,
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
