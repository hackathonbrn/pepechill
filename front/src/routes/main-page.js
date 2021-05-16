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
import { runInAction } from 'mobx';

import ActivitiesList from '../components/activities-list';
import './main-page.css';

import { getStore as getActivityStore } from '../stores/activities';
import { getStore as getUserStore } from '../stores/user';

const activityStore = getActivityStore();
const userStore = getUserStore();

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
        <IconButton className="create-button" onClick={this.open} size="lg" icon={<Icon icon="plus" />} circle />

        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Создание своего челленджа</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onChange={formValue => {
                this.setState({ formValue });
              }}
              onSubmit={() =>
                activityStore.createActivity({
                  ...this.state.formValue,
                  users: [{ username: userStore.user.username, records: [] }],
                })
              }
              fluid
            >
              <FormGroup>
                <ControlLabel>Название</ControlLabel>
                <FormControl name="caption" type="username" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Описание</ControlLabel>
                <FormControl rows={5} name="text" componentClass="textarea" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Сколько чего</ControlLabel>
                <FormControl
                  accepter={Slider}
                  defaultValue={50}
                  progress
                  min={0}
                  max={200}
                  name="target"
                  style={{ width: '92%', margin: 'auto' }}
                />
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
