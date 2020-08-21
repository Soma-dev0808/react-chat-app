import * as types from "./actionTypes"

export function roomApiRequest() {
    return {
        type: types.CHAT_ROOM_API_PENDING
    }
}

export function roomApiSucceed(payload) {
    return {
        type: types.CHAT_ROOM_API_SUCCEED,
        payload
    }
}

export function roomApiFailed(payload) {
    return {
        type: types.CHAT_ROOM_API_FAILED,
        payload
    }
}

export function setUserRoomInfo(payload) {
    return {
        type: types.SET_USER_ROOM_INFO,
        payload
    }
}

export function setRoomName(payload) {
    return {
        type: types.SET_ROOM_NAME,
        payload
    }
}

export function cleanUp() {
    return {
        type: types.ROOM_INFO_CLEAN_UP,
    }
}