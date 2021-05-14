import React from 'react';

import { Panel, Form, FormGroup, FormControl, Button, ControlLabel, Schema } from 'rsuite';

const RegisterPanel = () => {
  const { StringType } = Schema.Types;

  const userModel = Schema.Model({
    username: StringType().isRequired('Введите логин!'),
    email: StringType().isRequired('Введите имя!'),
    password: StringType().isRequired('Введите пароль!'),
  });

  return (
    <Panel header={<h3>Регистрация</h3>} bordered>
      <Form fluid>
        <FormGroup>
          <ControlLabel>Логин</ControlLabel>
          <FormControl name="username" type="username" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Имя пользователя</ControlLabel>
          <FormControl name="name" type="name" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Пароль</ControlLabel>
          <FormControl name="password" type="password" />
        </FormGroup>
        <FormGroup>
          <Button appearance="primary">Зарегестрироваться</Button>
        </FormGroup>
      </Form>
    </Panel>
  );
};

export default RegisterPanel;
