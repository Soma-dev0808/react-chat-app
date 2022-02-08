import firebase from "firebase/app";
import { db, auth } from "../../../service/firebase";
import { en } from "../../../utils/language";
import { convertFBApiResponse } from "../../../utils/utilities";

export async function fetchUser(roomName) {
  const { DB_ROOM_COLLECTION, ROOM_NOT_EXISTS_ERROR, FETCH_USER_ERROR } = en;

  try {
    const checkRoom = await db
      .collection(DB_ROOM_COLLECTION)
      .doc(roomName)
      .get();

    if (!checkRoom.exists) {
      return convertFBApiResponse(false, ROOM_NOT_EXISTS_ERROR);
    }

    const user = await checkRoom
      .data()
      .users.find((user) => user.email === auth.currentUser.email);

    // Save user name to reducer
    return convertFBApiResponse(true, user);
  } catch (error) {
    return convertFBApiResponse(false, FETCH_USER_ERROR);
  }
}

export async function fetchMessages(roomName) {
  const {
    DB_ROOM_COLLECTION,
    DB_CHAT_COLLECTION,
    DB_ORDER_BY_CREATED_DATE,
    ASC_ORDER,
    FETCH_MESSAGE_ERROR,
  } = en;

  try {
    const chats = await db
      .collection(DB_ROOM_COLLECTION)
      .doc(roomName)
      .collection(DB_CHAT_COLLECTION)
      .orderBy(DB_ORDER_BY_CREATED_DATE, ASC_ORDER)
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
    return convertFBApiResponse(false, FETCH_MESSAGE_ERROR);
  }
}

export async function saveMessages({ message, room, username }) {
  const { DB_ROOM_COLLECTION, DB_CHAT_COLLECTION, UPDATE_MESSAGE_ERROR } = en;

  return db
    .collection(DB_ROOM_COLLECTION)
    .doc(room)
    .collection(DB_CHAT_COLLECTION)
    .add({
      message,
      user: username,
      date_created: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => convertFBApiResponse())
    .catch((err) => convertFBApiResponse(false, UPDATE_MESSAGE_ERROR));
}
