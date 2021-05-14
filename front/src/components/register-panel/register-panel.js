import React from 'react';

import { Panel, Form, FormGroup, FormControl, Button, ControlLabel, Schema } from 'rsuite';

import { passwordValidate, usernameValidate } from '../../utils/validators';

const TextField = props => {
  const { name, label, type } = props;
  return (
    <FormGroup>
      <ControlLabel>{label} </ControlLabel>
      <FormControl name={name} type={type} />
    </FormGroup>
  );
};

const RegisterPanel = () => {
  const { StringType } = Schema.Types;

  const model = Schema.Model({
    username: StringType()
      .isRequired('Введите логин')
      .addRule(value => usernameValidate(value), 'Некорректное имя пользователя'),
    name: StringType().isRequired('Введите имя'),
    password: StringType()
      .isRequired('Введите пароль')
      .minLength(8, 'Минимальная длина пароля 8 символов')
      .addRule(value => passwordValidate(value), 'Пароль должен состоять из букв и цифр'),
  });

  return (
    <Panel header={<h3>Регистрация</h3>} bordered>
      <Form model={model} fluid>
        <TextField name="username" label="Логин" type="username" />
        <TextField name="name" label="Имя пользователя" type="name" />
        <TextField name="password" label="Пароль" type="password" />
        <FormGroup>
          <Button appearance="primary" type="submit">
            Зарегестрироваться
          </Button>
        </FormGroup>
      </Form>
    </Panel>
  );
};

export default RegisterPanel;
