import firebase from "firebase/app";
import { db, auth } from "../../../service/firebase";
import constants from "../../../utils/constants";
import { convertFBApiResponse } from "../../../utils/utilities";

export async function fetchUser(roomName) {
  const { dbRoomCollection, roomNotExsistsError, fetchUserError } = constants;

  try {
    const checkRoom = await db.collection(dbRoomCollection).doc(roomName).get();

    if (!checkRoom.exists) {
      return convertFBApiResponse(false, roomNotExsistsError);
    }

    const user = await checkRoom
      .data()
      .users.find((user) => user.email === auth.currentUser.email);

    // Save user name to reducer
    return convertFBApiResponse(true, user);
  } catch (error) {
    return convertFBApiResponse(false, fetchUserError);
  }
}

export async function fetchMessages(roomName) {
  const {
    dbRoomCollection,
    dbChatCollection,
    dbOrderByCreatedDate,
    ascOrder,
    fetchMessageError,
  } = constants;

  try {
    const chats = await db
      .collection(dbRoomCollection)
      .doc(roomName)
      .collection(dbChatCollection)
      .orderBy(dbOrderByCreatedDate, ascOrder)
      .get();

    let messageArray = [];

    if (chats.empty) {
      return convertFBApiResponse(true, messageArray);
    }

    chats.forEach((chat) =>
      messageArray.push({
        id: chat.id,
        user: chat.data().user,
        text: chat.data().message,
        timeStamp: chat.data().date_created,
      })
    );

    return convertFBApiResponse(true, messageArray);
  } catch (error) {
    return convertFBApiResponse(false, fetchMessageError);
  }
}

export async function saveMessages({ message, room, username }) {
  const { dbRoomCollection, dbChatCollection, updateMessageError } = constants;

  return db
    .collection(dbRoomCollection)
    .doc(room)
    .collection(dbChatCollection)
    .add({
      message,
      user: username,
      date_created: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => convertFBApiResponse())
    .catch((err) => {
      return convertFBApiResponse(false, updateMessageError);
    });
}
