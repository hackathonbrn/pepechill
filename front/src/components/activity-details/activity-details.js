import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import {
  Modal,
  Panel,
  Progress,
  Icon,
  FlexboxGrid,
  Whisper,
  Popover,
  ControlLabel,
  FormControl,
  FormGroup,
  Form,
  Button,
  IconButton,
  Loader,
  ButtonToolbar,
} from 'rsuite';
import { runInAction } from 'mobx';

import { useHistory, useParams } from 'react-router-dom';

import './activity-details.css';
import { getStore as getActivityStore } from '../../stores/activities';
import { getStore as getUserStore } from '../../stores/user';

const activityStore = getActivityStore();
const userStore = getUserStore();

// const userList = [
//   {
//     username: 'andrey',
//     records: [
//       { value: 18, timestamp: 452345 },
//       { value: 20, timestamp: 3245224 },
//     ],
//   },
//   {
//     username: 'daniil',
//     records: [
//       { value: 12, timestamp: 452345 },
//       { value: 85, timestamp: 3245224 },
//     ],
//   },
// ];

const ModalAdd = () => {
  const history = useHistory();
  return (
    <Modal backdrop={true} show={true}>
      <Modal.Body>
        <Modal.Title>Хотите присоедениться к цели?</Modal.Title>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            const activity = toJS(activityStore.activity);

            activityStore.addUser({ id: activity._id });
          }}
          appearance="primary"
        >
          Ok
        </Button>
        <Button onClick={() => history.push('/')} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ActivityDetails = observer(() => {
  const history = useHistory();
  const params = useParams();

  const [progress, setProgress] = useState('');

  const id = params.id;
  useEffect(() => {
    activityStore.getActivity(id);
  }, [id]);

  const { Circle } = Progress;

  if (!id) {
    console.log('replace');
    history.replace('/');
  }

  if (!activityStore.activity) return <Loader center size="lg" />;

  const { caption, text, users } = activityStore.activity;

  let userList = toJS(users);

  console.log(userList);

  const userListProgress = userList.map(el => {
    console.log(el);
    const speaker = (
      <Popover title="Прогресс">
        <div
          style={{
            width: 120,
            display: 'inline-block',
            marginRight: 10,
          }}
        >
          <Circle percent={el.records.length === 0 ? 0 : el.records[el.records.length - 1].value} strokeColor="#ffc107" />
        </div>
      </Popover>
    );

    return (
      <Whisper key={el.username} placement="left" trigger="hover" speaker={speaker}>
        <div className="people-progress">
          <Icon size="lg" icon="avatar" />
          <span style={{ fontSize: '25px' }}>{el.username}</span>
        </div>
      </Whisper>
    );
  });

  const idx = userList.findIndex(item => item.username === userStore.user.username);

  const modal = idx === -1 ? <ModalAdd /> : null;

  return (
    <div>
      {modal}
      {/* <Icon icon="peoples" />
          <span>{userList.length}</span> */}
      <Panel bordered header={<h3>{caption}</h3>} className="activity_details">
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item colspan={8}>
            <p style={{ fontSize: '24px' }}>{text}</p>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4}>{userListProgress}</FlexboxGrid.Item>
        </FlexboxGrid>
        <Form
          onSubmit={() => {
            const idx = userList.findIndex(item => item.username === userStore.user.username);
            userList[idx].records.push({ value: progress, timestamp: Number(new Date()) });
            let data = { ...activityStore.activity, users: userList };

            console.log('list', userList);
            activityStore.editActivity(data);
          }}
        >
          <FormGroup>
            <ControlLabel>Ваш прогресс</ControlLabel>
            <FormControl onChange={e => setProgress(e)} value={progress} type="number" name="progress" />
          </FormGroup>
          <FormGroup>
            <ButtonToolbar>
              <Button type="submit" appearance="primary">
                Записать прогресс
              </Button>
              <IconButton
                onClick={async () => {
                  await activityStore.deleteActivity({ id });
                  activityStore.getActivities();
                  history.push('/');
                }}
                color="red"
                className="delete-button"
                icon={<Icon icon="trash-o" />}
              />
            </ButtonToolbar>
          </FormGroup>
        </Form>
      </Panel>
    </div>
  );
});

export default ActivityDetails;
