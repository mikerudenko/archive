import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  component: Component,
  hasAccess,
  path,
  ...rest
}) => (
  <Route
    path={path}
    {...rest}
    render={props =>
      hasAccess ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);
