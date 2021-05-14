import React from 'react';

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
} from 'rsuite';

const ActivitiesItem = ({ name }) => {
  return <Button appearance="primary">{name}</Button>;
};

export default ActivitiesItem;
