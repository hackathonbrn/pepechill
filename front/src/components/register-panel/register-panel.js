import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Panel, Form, FormGroup, FormControl, Button, ControlLabel, Schema } from 'rsuite';
import { useHistory } from 'react-router-dom';

import { passwordValidate, usernameValidate } from '../../utils/validators';

import { getStore } from '../../stores/auth';

const store = getStore();

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

const TextField = props => {
  const { name, label, type } = props;
  return (
    <FormGroup>
      <ControlLabel>{label} </ControlLabel>
      <FormControl name={name} type={type} {...props} />
    </FormGroup>
  );
};

const RegisterPanel = observer(() => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  return (
    <Panel header={<h3>Регистрация</h3>} bordered>
      <Form model={model} onSubmit={() => store.register(username, name, password)} fluid>
        <TextField name="username" label="Логин" type="username" onChange={e => setUsername(e)} value={username} />
        <TextField name="name" label="Имя пользователя" type="name" onChange={e => setName(e)} value={name} />
        <TextField name="password" label="Пароль" type="password" onChange={e => setPassword(e)} value={password} />
        <FormGroup>
          <Button appearance="primary" type="submit">
            Зарегистрироваться
          </Button>
          <Button appearance="link" onClick={() => history.push('/login')}>
            Войти
          </Button>
        </FormGroup>
      </Form>
    </Panel>
  );
});

export default RegisterPanel;
