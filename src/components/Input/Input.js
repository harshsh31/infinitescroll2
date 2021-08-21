import React from "react";
import s from "./Input.module.css";

const Input = ({ type, value, onChange, ...rest }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
      className={s.input}
    />
  );
};

export default Input;
