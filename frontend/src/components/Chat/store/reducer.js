import * as types from "./actionTypes"

const initialUserState = {
    // Fetch user
    isUserFetching: false,
    fetchedUserName: false,
    isFetchUserFailed: false,
    fetchUserError: null,
}

function userReducer(state = initialUserState, acion) {
    const { type, payload } = acion

    switch(type) {
        case types.FETCH_USER_PENDING: 
            return {
               ...initialUserState,
               isUserFetching: true
            }
        case types.FETCH_USER_SUCCEED: 
            return {
                isUserFetching: false,
                fetchedUserName: payload
            }
        case types.FETCH_USER_FAILED: 
            return {
                isUserFetching: false,
                isFetchUserFailed: true,
                fetchUserError: payload
            } 
        default:
            return state
    }
}

const initialMessageState = {
    // Fetch Message
    isMessageFetching: false,
    fetchedMessages: null,
    isFetchMessagesFailed: false,
    fetchedMessagesError: null,
    // Save message into firestore
    isMessageSaving: false,
    isMessageSaved: false,
    isMessageSaveError: false,
    saveMessageError: null,
}

function messageReducer(state = initialMessageState, acion) {
    const { type, payload } = acion

    switch(type) {
        // Fetch Message
        case types.FETCH_MESSAGE_PENDING: 
            return {
                ...initialMessageState,
                isMessageFetching: true
            }
        case types.FETCH_MESSAGE_SUCCEED: 
            return {
                isMessageFetching: false,
                fetchedMessages: payload
            }
        case types.FETCH_MESSAGE_FAILED: 
            return {
                isMessageFetching: false,
                isFetchMessagesFailed: true,
                fetchedMessagesError: payload
            }
        // Save Message
        case types.MESSAGE_UPDATE: 
            return {
                ...initialMessageState,
                isMessageSaving: true
            }
        case types.MESSAGE_UPDATE_SUCCEED: 
            return {
                isMessageSaving: false,
                isMessageSaved: true
            }
        case types.MESSAGE_UPDATE_FAILED: 
            return {
                isMessageSaving: false,
                isMessageSaveError: true,
                saveMessageError: payload
            }
        // Clean up
        case types.MESSAGE_CLEAN_UP: 
            return {
                ...initialMessageState
            }  
        default:
            return state
    }
}

export { userReducer, messageReducer }