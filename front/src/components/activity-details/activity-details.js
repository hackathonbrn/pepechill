import React from 'react';
// import { toJS } from 'mobx';
import {
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
} from 'rsuite';

import './activity-details.css';

const userList = [
  {
    username: 'andrey',
    records: [
      { value: 18, timestamp: 452345 },
      { value: 20, timestamp: 3245224 },
    ],
  },
  {
    username: 'daniil',
    records: [
      { value: 12, timestamp: 452345 },
      { value: 85, timestamp: 3245224 },
    ],
  },
];

const ActivityDetails = ({ caption, text, target }) => {
  const { Circle } = Progress;
  // let userList = toJS(users);
  // console.log(users);
  console.log(userList);

  const userListProgress = userList.map(el => {
    const speaker = (
      <Popover title="Прогресс">
        <div
          style={{
            width: 120,
            display: 'inline-block',
            marginRight: 10,
          }}
        >
          <Circle percent={el.records[el.records.length - 1].value} strokeColor="#ffc107" />
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

  return (
    <Panel bordered header={caption} className="activity_details">
      <IconButton color="red" className="delete-button" size="lg" icon={<Icon icon="trash-o" />} circle />
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={6}>
          <p>{text}</p>
          <Icon icon="peoples" />
          <span>{userList.length}</span>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={6}>{userListProgress}</FlexboxGrid.Item>
      </FlexboxGrid>
      <Form>
        <FormGroup>
          <ControlLabel>Ваш прогресс</ControlLabel>
          <FormControl type="number" name="progress" />
        </FormGroup>
        <FormGroup>
          <Button type="submit" appearance="primary">
            Записать прогресс
          </Button>
        </FormGroup>
      </Form>
    </Panel>
  );
};

export default ActivityDetails;
