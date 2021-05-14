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
} from 'rsuite';

const LoginPanel = () => {
  return (
    <Panel header={<h3>Авторизация</h3>} bordered>
      <Form fluid>
        <FormGroup>
          <ControlLabel>Логин</ControlLabel>
          <FormControl name="username" type="username" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Пароль</ControlLabel>
          <FormControl name="password" type="password" />
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <Button appearance="primary">Войти</Button>
            <Button appearance="link">Забыли пароль?</Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </Panel>
  );
};

export default LoginPanel;
