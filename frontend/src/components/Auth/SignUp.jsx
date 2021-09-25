import React, { useContext } from "react";
import AuthForm from "./AuthForm/AuthForm";
import LoadingIndicator from "../../common_components/LoadingIndicator/LoadingIndicator";

import { handleSubmit } from "./service/service";
import { ApiErrorContext } from "../../common_components/ApiErrorContext/ApiErrorContextProvider";

const SignUp = ({ history }) => {
  const {
    apiErrorStatus: { isApiLoading },
    setAPIError,
    startOrEndCallApi,
  } = useContext(ApiErrorContext);

  // do sign up
  const handleRegistration = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const userInput = {
      username,
      email,
      password,
    };
    handleSubmit(userInput, startOrEndCallApi, setAPIError, history);
  };

  return (
    <>
      <AuthForm
        isLogin={false}
        formAction={handleRegistration}
        isLoading={isApiLoading}
      />
      <LoadingIndicator isLoading={isApiLoading} />
    </>
  );
};

export default SignUp;
