import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import 'rsuite/dist/styles/rsuite-default.css';

import LoginPage from './routes/login-page';
import RegisterPage from './routes/register-page';
import MainPage from './routes/main-page';

import { getStore as getUserStore } from './stores/user';
import { getStore as getAuthStore } from './stores/auth';
import { getStore as getActivitiesStore } from './stores/activities';
import { Loader } from 'rsuite';

const userStore = getUserStore();
const authStore = getAuthStore();
const activityStore = getActivitiesStore();

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

const App = observer(() => {
  useEffect(() => {
    userStore.getUser();
  }, []);

  if (userStore.loading || activityStore.loading || authStore.loading) return <Loader center size="lg" />;

  return (
    <Router>
      <Switch>
        <PrivateRoute authed={Boolean(userStore.user)} path="/" component={MainPage} exact />
        <PublicRoute authed={Boolean(userStore.user)} path="/register" component={RegisterPage} />
        <PublicRoute authed={Boolean(userStore.user)} path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
});

export default App;
