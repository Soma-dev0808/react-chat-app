import * as types from "./actionTypes"

const initialState = {
    isRoomApiPending: false,
    isRoomCreated: false,
    roomName: null,
    userName: null,
    isRoomCreateFailed: false,
    roomError: null
}

function roomReducer(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case types.CHAT_ROOM_API_PENDING:
            return {
                ...initialState,
                isRoomApiPending: true
            }
        case types.CHAT_ROOM_API_SUCCEED:
            return {
                ...state,
                isRoomApiPending: false,
                isRoomCreated: true,
                roomName: payload.roomName,
                userName: payload.userName
            }
        case types.CHAT_ROOM_API_FAILED:
            return {
                ...state,
                isRoomApiPending: false,
                isRoomCreateFailed: true,
                roomError: payload
            }
        case types.SET_USER_ROOM_INFO:
            return {
                ...state,
                roomName: payload.roomName,
                userName: payload.userName
            }
        case types.SET_ROOM_NAME:
            return {
                ...state,
                roomName: payload,
            }
        case types.ROOM_INFO_CLEAN_UP:
            return {
                ...state,
                isRoomCreated: false,
                isRoomCreateFailed: false,
            }
        default:
            return state
    }
}

export default roomReducer