import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import React, { Suspense, lazy, useState } from "react";
import { useSelector } from "react-redux";

const Login = lazy(() => import("./containers/Login/Login"));
const Home = lazy(() => import("./containers/Home/Home"));

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(authed);
        return authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
}
const App = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const authed = userDetails != null;
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route exact path="/">
          <Redirect to={authed ? "/home" : "/login"} />
        </Route>
        <PrivateRoute authed={authed} path="/home" component={Home} />
      </Switch>
    </Suspense>
  );
};

export default withRouter(App);
