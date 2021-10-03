import React, { createContext, useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";

export const ApiErrorContext = createContext();

const API_HEADER_MESSAGE_DISPLAY_TIME = 4000;

const ApiErrorContextProvider = ({ history, children }) => {
  // apiErrorMessage can be string or array<string>
  const [apiErrorStatus, setApiErrorStatus] = useState({
    isApiLoading: false,
    apiErrorMessage: null,
    redirectPath: null,
  });
  const { apiErrorMessage, redirectPath } = apiErrorStatus;

  // show loading indicator
  const startOrEndCallApi = useCallback(
    (isStart = true) => {
      setApiErrorStatus((prevState) => ({
        isApiLoading: isStart,
        apiErrorMessage: isStart ? null : prevState.apiErrorMessage,
        redirectPath: isStart ? null : prevState.redirectPath,
      }));
    },
    [setApiErrorStatus]
  );

  // show api error message
  const setAPIError = useCallback(
    (errMessage, redirectPath = null) => {
      setApiErrorStatus({
        isApiLoading: false,
        apiErrorMessage: errMessage,
        redirectPath,
      });
    },
    [setApiErrorStatus]
  );

  // clear error message
  const clearError = useCallback(() => {
    setApiErrorStatus((prevState) => ({
      ...prevState,
      redirectPath: null,
      apiErrorMessage: null,
    }));
  }, [setApiErrorStatus]);

  useEffect(() => {
    let timer;

    // if need to redirect user when error occurs, redirect here
    if (redirectPath) {
      history.push(redirectPath);
    }

    // if there's api error, show error and close it after 3 sec
    if (apiErrorMessage) {
      timer = setTimeout(() => {
        clearError();
      }, API_HEADER_MESSAGE_DISPLAY_TIME);
    }

    return () => {
      // reset timer
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [apiErrorMessage, redirectPath, history, clearError]);

  return (
    <ApiErrorContext.Provider
      value={{
        apiErrorStatus,
        startOrEndCallApi,
        setAPIError,
        clearError,
      }}
    >
      {children}
    </ApiErrorContext.Provider>
  );
};

export default withRouter(ApiErrorContextProvider);
