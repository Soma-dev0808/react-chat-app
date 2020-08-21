import * as actions from "../store/actionCreator"
import { db, auth } from "../../../service/firebase"
import constants from "../../../service/constants"
import { routePath } from "../../../service/routes"

export function launchRoomService({userName, roomName}) {
    return async (dispatch) => {
        dispatch(actions.roomApiRequest())
        const checkRoom = await db.collection("rooms").doc(roomName).get()
        if(checkRoom.exists) return dispatch(actions.roomApiFailed(constants.roomAlreadyExsistsError))
        
        db.collection("rooms").doc(roomName).set({
            users: [
                {
                    name: userName,
                    email: auth.currentUser.email
                }
            ],
            roomName
        })
        .then(res => {
            dispatch(actions.roomApiSucceed({userName, roomName}))
        })
        .catch(err => {
            console.log(err)
            dispatch(actions.roomApiFailed(constants.createRoomError))
        })
    }
}

export function joinRoomService(roomName, history) {
    return async (dispatch) => {
        dispatch(actions.roomApiRequest())
        try {
            const checkRoom = await db.collection("rooms").doc(roomName).get()

            if(!checkRoom.exists) return dispatch(actions.roomApiFailed(constants.roomNotExsistsError))
            
            const user =  await checkRoom
                                    .data()
                                    .users
                                    .find(user => user.email === auth.currentUser.email)

            // Check if user already joined the room before
            // If not, redirect to select user name page
            if (user) {
                dispatch(actions.roomApiSucceed({userName: user.name, roomName})) 
            }
            else {
                dispatch(actions.setRoomName(roomName))
                history.push(routePath.setUserName)
            }
        } catch (error) {
            dispatch(actions.roomApiFailed(constants.joinRoomError))
        }
        
    }
}

// Set user to chat room
export function setUserNameService({userName, roomName}) {
    return async (dispatch) => {
        dispatch(actions.roomApiRequest())

        const checkRoom = await db.collection("rooms").doc(roomName).get()

        if(!checkRoom.exists) return dispatch(actions.roomApiFailed(constants.roomNotExsistsError))

        const usersArray =  await checkRoom.data().users

        const user = usersArray.find(user => user.name === userName)
                                
        // username is taken
        if(user) {
            dispatch(actions.roomApiFailed(constants.userNameExistsError))
            dispatch(actions.setUserRoomInfo({userName, roomName}))
            return
        }
        
        db.collection("rooms").doc(roomName).update({
            users: [
                ...usersArray,
                {
                    name: userName,
                    email: auth.currentUser.email
                }
            ],
            roomName
        })
        .then(res => {
            dispatch(actions.roomApiSucceed({userName, roomName}))
        })
        .catch(err => {
            console.log(err)
            dispatch(actions.roomApiFailed(constants.createRoomError))
            dispatch(actions.setUserRoomInfo({userName, roomName}))
        })
    }
}

