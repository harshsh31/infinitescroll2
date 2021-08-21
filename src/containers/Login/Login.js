import React, { useState } from "react";
import s from "./Login.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../reducers/usersReducer";
const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const onLoginClick = () => {
    const userFound = user.usersList.find(
      (u) => u.username == userName && u.password == password
    );
    if (userFound) {
      dispatch(userActions.addUserDetails({ userName, password }));
      dispatch(userActions.setErrorUser(false));
      history.push("/home");
    } else {
      dispatch(userActions.setErrorUser(true));
    }
  };
  return (
    <div className={s.loginWrapper}>
      <div className={s.loginContainer}>
        <div className={s.inputContainer}>
          <label className={s.label} htmlFor="username">
            Username
          </label>
          <Input
            type={"text"}
            value={userName}
            onChange={(val) => setUserName(val)}
            name={"username"}
          />
        </div>
        <div className={s.inputContainer}>
          <label className={s.label} htmlFor="password">
            Password
          </label>
          <Input
            type={"password"}
            value={password}
            onChange={(val) => setPassword(val)}
            name={"password"}
          />
        </div>
        <Button type="button" onClick={onLoginClick}>
          Login
        </Button>
        <div className={`${s.errorMessage} ${user.error ? "" : s.hide}`}>
          Please enter valid credentials!
        </div>
      </div>
    </div>
  );
};

export default Login;
