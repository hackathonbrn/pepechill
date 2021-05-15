import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';

import { ButtonToolbar, Panel, Form, FormGroup, FormControl, Button, ControlLabel, Schema } from 'rsuite';

import { getStore } from '../../stores/auth';

const store = getStore();

const { StringType } = Schema.Types;

const model = Schema.Model({
  username: StringType().isRequired('Введите логин'),
  password: StringType().isRequired('Введите пароль'),
});

const LoginPanel = observer(() => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Panel header={<h3>Авторизация</h3>} bordered>
      <Form model={model} onSubmit={() => store.login(username, password)} fluid>
        <FormGroup>
          <ControlLabel>Логин </ControlLabel>
          <FormControl onChange={e => setUsername(e)} value={username} name="username" type="username" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Пароль </ControlLabel>
          <FormControl onChange={e => setPassword(e)} value={password} name="password" type="password" />
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <Button type="submit" appearance="primary">
              Войти
            </Button>
            <Button appearance="link" onClick={() => history.push('/register')}>
              Забыли пароль?
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </Panel>
  );
});

export default LoginPanel;
