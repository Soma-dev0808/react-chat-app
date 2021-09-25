import React from "react";
import { routePath } from "../../../router/router";
import StyledLink from "../../../common_components/Link/StyledLink";

import { en } from "../../../utils/language";
import "../Auth.scss";

const AuthForm = ({ isLogin, formAction, isLoading }) => {
  const formTitle = isLogin ? en.SIGN_IN : en.SIGN_UP;
  const linkTitle = isLogin ? en.SIGN_UP_LINK : en.SIGN_IN_LINK;
  const linkAddress = isLogin ? routePath.signUp : routePath.signIn;
  return (
    <div className="auth-outer-container">
      <form className="auth-inner-container" onSubmit={formAction}>
        <h1 className="heading">{formTitle}</h1>
        {!isLogin && (
          <input
            placeholder={en.USERNAME_PLACEHOLDER}
            className="join-input mb-20"
            type="text"
            name="username"
            disabled={isLoading}
          />
        )}
        <input
          placeholder={en.EMAIL_PLACEHOLDER}
          className="join-input"
          type="text"
          name="email"
          disabled={isLoading}
        />
        <input
          placeholder={en.PASSWORD_PLACEHOLDER}
          className="join-input mt-20"
          type="password"
          name="password"
          disabled={isLoading}
        />
        <button className="button mt-20" type="submit" disabled={isLoading}>
          {formTitle}
        </button>
        <StyledLink to={linkAddress} title={linkTitle} disabled={isLoading} />
      </form>
    </div>
  );
};

export default AuthForm;
