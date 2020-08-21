import * as actions from "../store/actionCreator"

import firebase from "firebase/app"
import { db, auth } from "../../../service/firebase"
import constants from "../../../service/constants"

export function fetchUser(roomName) {
    const { 
        dbRoomCollection, 
        roomNotExsistsError, 
        fetchUserError } = constants

    return async (dispatch) => {
        dispatch(actions.requestFetchUser())
        try {
            const checkRoom = await db
                                    .collection(dbRoomCollection)
                                    .doc(roomName)
                                    .get()

            if(!checkRoom.exists) return dispatch(actions.fetchUserFailed(roomNotExsistsError))

            const user =  await checkRoom
                                .data()
                                .users
                                .find(user => user.email === auth.currentUser.email)

            // Save user name to reducer
            user
            ? dispatch(actions.fetchUserSucceed(user.name))
            : dispatch(actions.fetchUserFailed(fetchUserError))
        } catch (error) {
            console.log(error)
            dispatch(actions.fetchUserFailed(fetchUserError))
        }

    }
}

export function fetchMessages(roomName) {
    const { 
        dbRoomCollection, 
        dbChatCollection, 
        dbOrderByCreatedDate, 
        ascOrder, 
        fetchMessageError} = constants

    return async (dispatch) => {
        dispatch(actions.requestFetchMessages())
        try {
            const chats = await db
                                .collection(dbRoomCollection)
                                .doc(roomName)
                                .collection(dbChatCollection)
                                .orderBy(dbOrderByCreatedDate, ascOrder)
                                .get()
            
            if(chats.empty) return dispatch(actions.fetchMessagesSucceed([]))

            let messageArray = []

            chats.forEach(chat => messageArray.push({
                                            user: chat.data().user, 
                                            text: chat.data().message
                                        }))
            dispatch(actions.fetchMessagesSucceed(messageArray))
        } catch (error) {
            dispatch(actions.fetchMessagesFailed(fetchMessageError))
        }

    }
}

export function saveMessages({ message, room, name}) {
    const { 
        dbRoomCollection, 
        dbChatCollection, 
        updateMessageError} = constants

    return async (dispatch) => {
        dispatch(actions.requestUpdatehMessages())
        db
        .collection(dbRoomCollection)
        .doc(room)
        .collection(dbChatCollection)
        .add({
            message,
            user: name,
            date_created: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(res => {
            dispatch(actions.updateMessagesSucceed())

        })
        .catch(err => {
            console.log(err)
            dispatch(actions.updateMessagesFailed(updateMessageError))
        })
    }
}
