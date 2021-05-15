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
  Checkbox,
  CheckboxGroup,
  Slider,
  DatePicker,
  RadioGroup,
  Radio,
} from 'rsuite';

const CreateActivity = () => {
  return (
    <Panel header={<h3>Создание своего челленджа</h3>} bordered>
      <Form fluid>
        <FormGroup>
          <ControlLabel>Название</ControlLabel>
          <FormControl name="challengeName" type="username" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Описание</ControlLabel>
          <FormControl rows={5} name="textarea" componentClass="textarea" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Сколько чего</ControlLabel>
          <Slider
            progress
            defaultValue={50}
            onChange={value => {
              console.log(value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Есть ли дата окончания</ControlLabel>
          <RadioGroup name="radioList">
            <Radio value="A">Да</Radio>
            <Radio value="B">Нет</Radio>
          </RadioGroup>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Дата окончания</ControlLabel>
          <DatePicker oneTap style={{ width: 280 }} />
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <Button appearance="primary">Создать</Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </Panel>
  );
};

export default CreateActivity;
