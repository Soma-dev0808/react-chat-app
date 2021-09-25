import React, { useContext, useCallback } from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import useAuth from "../CustomHooks/useAuth";

import ApiResponseBar from "./ApiResponseBar/ApiResponseBar";
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
    let authStatusButtonName = en.LOG_IN;
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
          <MenuButton
            buttonClick={handleButtonClick}
            buttonTitle={getButtonName()}
            diabled={isLoading}
          />
        )}
      </div>
      <ApiResponseBar />
    </div>
  );
};

const Title = () => {
  return <h3 className="header-title">Realtime Chat App</h3>;
};

const MenuButton = ({ buttonClick, buttonTitle, disabled }) => {
  return (
    <button className="header-menu" onClick={buttonClick} disabled={disabled}>
      {buttonTitle}
    </button>
  );
};

export default withRouter(Header);
