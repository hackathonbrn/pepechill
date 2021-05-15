import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';

import LoginPage from './routes/login-page';
import RegisterPage from './routes/register-page';
import MainPage from './routes/main-page';

import { getStore } from './stores/user';

const store = getStore();

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
    />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      }
    />
  );
}

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute authed={Boolean(store.user)} path="/" component={MainPage} exact />
          <PublicRoute authed={Boolean(store.user)} path="/register" component={RegisterPage} />
          <PublicRoute authed={Boolean(store.user)} path="/login" component={LoginPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
