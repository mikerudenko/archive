import React from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from './store/configureStore';
import { PrivateRoute } from './components/PrivateRoute';
import { DashboardContainer } from './Dashboard';
import { LoginContainer } from './Login';
import { selectAuthState } from './Login/store';

const App = ({ isAuth }) => {
  return (
    <ConnectedRouter history={history}>
      <div className="container">
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <PrivateRoute
            path="/dashboard"
            hasAccess={isAuth}
            component={DashboardContainer}
          />
          <Redirect from="/" to={isAuth ? '/dashboard' : '/login'} />
          <Redirect from="/:notfound" to="/login" />
        </Switch>
      </div>
    </ConnectedRouter>
  );
};

const mapStateToProps = state => ({
  isAuth: selectAuthState(state),
});

export const AppContainer = connect(mapStateToProps)(App);
