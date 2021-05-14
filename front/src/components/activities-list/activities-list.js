import React from 'react';
import ActivitiesItem from '../activities-item';

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

const ActivitiesList = () => {
  return (
    <ButtonToolbar>
      <ActivitiesItem name={'Бегать 10км'} />
      <ActivitiesItem name={'Не курить 2 недели'} />
    </ButtonToolbar>
  );
};

export default ActivitiesList;
