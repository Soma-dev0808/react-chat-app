import React from "react";
import { classNames } from "../../utils/utilities";
import "./Button.scss";

const Button = ({
  size = null,
  primary = false,
  danger = false,
  classnames = null,
  buttonType = "button",
  isDisabled = false,
  onClickEvent = () => {},
  buttonText = "",
}) => {
  const _classnames = classNames(
    "custom-button",
    { [classnames]: classnames != null },
    { "button-primary": primary },
    { "button-danger": danger },
    { "button-xs": size === "xs" },
    { "button-sm": size === "sm" },
    { "button-lg": size === "lg" }
  );

  return (
    <button
      className={_classnames}
      type={buttonType}
      disabled={isDisabled}
      onClick={onClickEvent}
    >
      {buttonText}
    </button>
  );
};

export default Button;
