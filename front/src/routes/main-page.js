import React, { Component } from 'react';
import {
  Container,
  IconButton,
  Icon,
  Modal,
  Button,
  ButtonToolbar,
  FormGroup,
  Form,
  ControlLabel,
  FormControl,
  Slider,
} from 'rsuite';

import ActivitiesList from '../components/activities-list';

import { getStore } from '../stores/activities';

const store = getStore();

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      formValue: {},
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }
  render() {
    return (
      <div className="modal-container">
        <Container>
          <ActivitiesList />
        </Container>
        <IconButton onClick={this.open} size="lg" icon={<Icon icon="plus" />} circle />

        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Создание своего челленджа</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onChange={formValue => {
                this.setState({ formValue });
              }}
              onSubmit={() => console.log(this.state.formValue)}
              fluid
            >
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
                <Slider name="target" style={{ width: '93%', margin: 'auto' }} progress defaultValue={50} />
              </FormGroup>
              <FormGroup>
                <ButtonToolbar>
                  <Button type="submit" onClick={this.close} appearance="primary">
                    Создать
                  </Button>
                  <Button onClick={this.close}>Закрыть</Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default MainPage;
