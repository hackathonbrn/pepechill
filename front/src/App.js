import React from 'react';

import 'rsuite/dist/styles/rsuite-default.css';
import ActivitiesItem from './components/activities-item';
import ActivitiesList from './components/activities-list';
import LoginPanel from './components/login-panel';
import RegisterPanel from './components/register-panel';
import Auth from './routes/auth';

import {
  FlexboxGrid,
  ButtonToolbar,
  Panel,
  Content,
  Container,
  Form,
  FormGroup,
  FormControl,
  Button,
  ControlLabel,
  Header,
  Navbar,
  Footer,
  Progress,
  IconButton,
  Icon,
} from 'rsuite';
import CreateActivity from './components/create-activity';

const App = () => {
  return (
    <div>
      <RegisterPanel />
      {/* <CreateActivity /> */}
      {/* <ActivitiesList />
      <IconButton size="md" icon={<Icon icon="search" />} circle />
      <IconButton size="md" icon={<Icon icon="plus" />} circle /> */}
    </div>
  );
};

export default App;
