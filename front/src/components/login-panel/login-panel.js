import React from 'react';

import { ButtonToolbar, Panel, Form, FormGroup, FormControl, Button, ControlLabel, Schema } from 'rsuite';

const TextField = props => {
  const { name, label, type } = props;
  return (
    <FormGroup>
      <ControlLabel>{label} </ControlLabel>
      <FormControl name={name} type={type} />
    </FormGroup>
  );
};

const LoginPanel = () => {
  const { StringType } = Schema.Types;

  const model = Schema.Model({
    username: StringType().isRequired('Введите логин'),
    password: StringType().isRequired('Введите пароль'),
  });

  return (
    <Panel header={<h3>Авторизация</h3>} bordered>
      <Form model={model} fluid>
        <TextField name="username" label="Логин" type="username" />
        <TextField name="password" label="Пароль" type="password" />
        <FormGroup>
          <ButtonToolbar>
            <Button type="submit" appearance="primary">
              Войти
            </Button>
            <Button appearance="link">Забыли пароль?</Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </Panel>
  );
};

export default LoginPanel;
