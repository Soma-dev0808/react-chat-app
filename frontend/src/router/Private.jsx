import React from "react";
import { Redirect, Route } from "react-router-dom";

import LoadingIndicator from "../common_components/LoadingIndicator/LoadingIndicator";
import useAuth from "../common_components/CustomHooks/useAuth";
import { routePath } from "./router";

const Private = (props) => {
  const { Component, ...rest } = props;
  const { isAuth, isLoading } = useAuth();

  return isLoading ? (
    <LoadingIndicator isLoading />
  ) : isAuth ? (
    <Route exact {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to={routePath.signIn} />
  );
};

export default Private;
