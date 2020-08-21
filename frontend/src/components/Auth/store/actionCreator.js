import * as types from "./actionTypes"

export function requestAuth() {
    return {
        type: types.AUTH_PENDING
    }
}

export function AuthSucceeded() {
    return {
        type: types.AUTH_SUCCEED
    }
}

export function AuthFailed(payload) {
    return {
        type: types.AUTH_FAILED,
        payload
    }
}