import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { runInAction } from 'mobx';
import { Loader, Navbar, Nav, Icon, Dropdown } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import './app.css';

import LoginPage from './routes/login-page';
import RegisterPage from './routes/register-page';
import MainPage from './routes/main-page';
import ActivityDetails from './components/activity-details';

import { getStore as getUserStore } from './stores/user';
import { getStore as getAuthStore } from './stores/auth';
import { getStore as getActivitiesStore } from './stores/activities';

const userStore = getUserStore();
const authStore = getAuthStore();
const activityStore = getActivitiesStore();

let lastPlace = '/';

function PrivateRoute({ component: Component, authed, ...rest }) {
  lastPlace = rest.location.pathname;

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
        authed === false ? <Component {...props} /> : <Redirect to={{ pathname: lastPlace, state: { from: props.location } }} />
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
      <Navbar appearance="inverse">
        <Navbar.Header className="navbar-brand logo">PEPECHILL</Navbar.Header>
        <Navbar.Body>
          <Nav>
            <Link to="/">
              <Nav.Item componentClass="span" className={authStore.authenticated ? 'menu-links' : 'invisible'}>
                Цели
              </Nav.Item>
            </Link>
          </Nav>
          <Nav pullRight>
            <Dropdown title="Меню" trigger="click" className={authStore.authenticated ? '' : 'invisible'}>
              <Dropdown.Item className="dropdown" onSelect={() => userStore.logout()}>
                Выйти
              </Dropdown.Item>
            </Dropdown>
          </Nav>
        </Navbar.Body>
      </Navbar>
      <Switch>
        <PrivateRoute authed={Boolean(userStore.user)} path="/" component={MainPage} exact />
        <PrivateRoute authed={Boolean(userStore.user)} path="/activities/:id" component={ActivityDetails} />
        <PublicRoute authed={Boolean(userStore.user)} path="/register" component={RegisterPage} exact />
        <PublicRoute authed={Boolean(userStore.user)} path="/login" component={LoginPage} exact />
      </Switch>
    </Router>
  );
});

export default App;
