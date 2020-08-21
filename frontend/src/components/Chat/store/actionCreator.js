import * as types from "./actionTypes"

// Fetch user
export function requestFetchUser() {
    return {
        type: types.FETCH_USER_PENDING
    }
}

export function fetchUserSucceed(payload) {
    return {
        type: types.FETCH_USER_SUCCEED,
        payload
    }
}

export function fetchUserFailed(payload) {
    return {
        type: types.FETCH_USER_FAILED,
        payload
    }
}

// Fetch Messages
export function requestFetchMessages() {
    return {
        type: types.FETCH_MESSAGE_PENDING
    }
}

export function fetchMessagesSucceed(payload) {
    return {
        type: types.FETCH_MESSAGE_SUCCEED,
        payload
    }
}

export function fetchMessagesFailed(payload) {
    return {
        type: types.FETCH_MESSAGE_FAILED,
        payload
    }
}

// Update Messages
export function requestUpdatehMessages() {
    return {
        type: types.MESSAGE_UPDATE
    }
}

export function updateMessagesSucceed(payload) {
    return {
        type: types.MESSAGE_UPDATE_SUCCEED,
        payload
    }
}

export function updateMessagesFailed(payload) {
    return {
        type: types.MESSAGE_UPDATE_FAILED,
        payload
    }
}

// Request Message Clean up
export function requestMessageCleanUp() {
    return {
        type: types.MESSAGE_CLEAN_UP
    }
}