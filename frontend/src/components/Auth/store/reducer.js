import * as types from "./actionTypes"

const initialState = {
    isAuthPending: false,
    isAuthSucceeded: false,
    isAuthFailed: false,
    authError: null
}

function authReducer(state = initialState, acion) {
    const { type, payload } = acion

    switch(type) {
        case types.AUTH_PENDING: 
            return {
                ...initialState,
                isAuthPending: true
            }
        case types.AUTH_SUCCEED: 
            return {
                ...state,
                isAuthPending: false,
                isAuthSucceeded: true
            }
        case types.AUTH_FAILED: 
            return {
                ...state,
                isAuthPending: false,
                isAuthFailed: true,
                authError: payload
            }
        default:
            return state
    }
}

export default authReducer