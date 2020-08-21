import React from "react"
import { Router as ReactRouter, Route , Switch } from "react-router-dom"
import { Provider } from "react-redux"
import Store from "./redux/store"
import { createBrowserHistory } from "history"
import { routePath } from "./service/routes"

import Private from "./router/Private"
import SignIn from "./components/Auth/SignIn"
import SignUp from "./components/Auth/SignUp"

import routes from "./router/router"

const history = createBrowserHistory()

const App = () => {
    return(
    <Provider store={Store}>
        <ReactRouter history={history}>
            <Switch>
                <Route path={routePath.signIn} exact component={SignIn} />
                <Route path={routePath.signUp} exact component={SignUp} />

                {routes.map((route, i) => {
                    return <Private exact key={i} {...route} />
                })}
            </Switch>
        </ReactRouter>
    </Provider>
    )}

export default App