import { combineReducers } from "redux"
import authReducer from "../../components/Auth/store/reducer"
import roomReducer from "../../components/Join/store/reducer"
import { userReducer, messageReducer } from "../../components/Chat/store/reducer"

const reducers = combineReducers({
    authReducer,
    roomReducer,
    userReducer,
    messageReducer,
})

export default reducers