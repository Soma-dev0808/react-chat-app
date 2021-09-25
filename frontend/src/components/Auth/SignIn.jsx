import React, { useContext } from "react";
import AuthForm from "./AuthForm/AuthForm";
import LoadingIndicator from "../../common_components/LoadingIndicator/LoadingIndicator";

import { handleSubmit } from "./service/service";
import { ApiErrorContext } from "../../common_components/ApiErrorContext/ApiErrorContextProvider";

const SignIn = ({ history }) => {
  const {
    apiErrorStatus: { isApiLoading },
    startOrEndCallApi,
    setAPIError,
  } = useContext(ApiErrorContext);

  // do sign in
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const userInput = {
      email,
      password,
    };
    handleSubmit(userInput, startOrEndCallApi, setAPIError, history, false);
  };

  return (
    <>
      <AuthForm
        isLogin={true}
        formAction={handleLogin}
        isLoading={isApiLoading}
      />
      <LoadingIndicator isLoading={isApiLoading} />
    </>
  );
};

export default SignIn;
