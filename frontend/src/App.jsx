import React from "react";
import { Router as ReactRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { routePath } from "./router/router";

import Private from "./router/Private";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Header from "./common_components/Header/Header";
import ApiErrorContextProvider from "./common_components/ApiErrorContext/ApiErrorContextProvider";

import routes from "./router/router";
import "./App.scss";

const history = createBrowserHistory();

const App = () => {
  return (
    <ReactRouter history={history}>
      <ApiErrorContextProvider>
        <Header />
        <Switch>
          <Route path={routePath.signIn} exact component={SignIn} />
          <Route path={routePath.signUp} exact component={SignUp} />

          {routes.map((route, i) => {
            return <Private exact key={i} {...route} />;
          })}
        </Switch>
      </ApiErrorContextProvider>
    </ReactRouter>
  );
};

export default App;
