import React, { useContext } from "react";
import { ApiErrorContext } from "../../ApiErrorContext/ApiErrorContextProvider";
import Button from "../../Button/Button";

import "./ApiResponseBar.scss";

const ApiResponseBar = () => {
  const { apiErrorStatus, clearError } = useContext(ApiErrorContext);
  const { apiErrorMessage } = apiErrorStatus;
  let errorMessages = [];

  // clear button
  const handleClearError = () => {
    clearError();
  };

  // set error messages as array
  if (apiErrorMessage !== null) {
    errorMessages = Array.isArray(apiErrorMessage)
      ? apiErrorMessage
      : [apiErrorMessage];
  }

  return (
    errorMessages.length > 0 && (
      <div className="header-status-bar header-error">
        <div className="header-status-message">
          <ul className="">
            {errorMessages.map((message, idx) => (
              <li key={idx}>{message}</li>
            ))}
          </ul>
        </div>
        <div>
          <Button size="xs" onClickEvent={handleClearError} buttonText={"x"} />
        </div>
      </div>
    )
  );
};

export default ApiResponseBar;
