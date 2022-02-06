import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useGlobalContext } from "../hooks/context";

const PrivateRoute = ({ children, ...rest }) => {
  const value = useGlobalContext();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        value.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
