import React from "react";

import classes from "./Button.module.css";

const Button = ({ type, onClick, children, className }) => {
  return (
    <button
      className={`${classes.button} ${className ? className : ""}`}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
