import * as actions from "../store/actionCreator"
import { auth } from "../../../service/firebase"

export function signUp({ email, password }) {
    return (dispatch) => {
        dispatch(actions.requestAuth())
        return auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                dispatch(actions.AuthSucceeded())
            })
            .catch(err => {
                console.log(err)
                dispatch(actions.AuthFailed(err.message))
            })
    }
}

export function signIn({ email, password }) {
    return (dispatch) => {
        dispatch(actions.requestAuth())
        return auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                dispatch(actions.AuthSucceeded())
            })
            .catch(err => {
                console.log(err)
                dispatch(actions.AuthFailed(err.message))
            })
    }
}