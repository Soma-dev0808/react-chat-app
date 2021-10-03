import React, { useContext, useCallback } from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import useAuth from "../CustomHooks/useAuth";

import ApiResponseBar from "./ApiResponseBar/ApiResponseBar";
import Button from "../Button/Button";
import { en } from "../../utils/language";
import { routePath } from "../../router/router";
import { signOut } from "../../components/Auth/service/service";

import { ApiErrorContext } from "../ApiErrorContext/ApiErrorContextProvider";
import "./Header.scss";

const Header = () => {
  const { startOrEndCallApi, setAPIError } = useContext(ApiErrorContext);
  const { isLoading, isAuth } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const handleButtonClick = async (e) => {
    e.preventDefault();
    // sign out if isAuth is true.
    if (isAuth) {
      startOrEndCallApi();
      const res = await signOut(history);
      if (res?.errorMessage) {
        setAPIError(res.errorMessage);
      } else {
        startOrEndCallApi(false);
      }
    } else if (!isAuth && location.pathname === routePath.signIn) {
      // go to sign up page
      history.push(routePath.signUp);
    } else {
      // go to sign in page
      history.push(routePath.signIn);
    }
  };

  const getButtonName = useCallback(() => {
    let authStatusButtonName = en.SIGN_IN;
    if (isAuth) {
      authStatusButtonName = en.LOG_OUT;
    } else if (!isAuth && location.pathname === routePath.signIn) {
      authStatusButtonName = en.SIGN_UP;
    }

    return authStatusButtonName;
  }, [location.pathname, isAuth]);

  return (
    <div className="header-parent">
      <div className="header-bar">
        <Title />
        {!isLoading && (
          <div>
            <Button
              isDisabled={isLoading}
              buttonText={getButtonName()}
              onClickEvent={handleButtonClick}
              size={"sm"}
            />
          </div>
        )}
      </div>
      <ApiResponseBar />
    </div>
  );
};

const Title = () => {
  return <h3 className="header-title">Realtime Chat App</h3>;
};

export default withRouter(Header);
