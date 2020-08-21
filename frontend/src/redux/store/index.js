import { createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import reducers from "../reducers"

const middlewares = [thunkMiddleware]
const middlewareEnhancer = applyMiddleware(...middlewares)
const enhancers = [middlewareEnhancer]
const composeEnhancers = composeWithDevTools(...enhancers)
const initialState = {}
const store = createStore(reducers, initialState, composeEnhancers)

export default store