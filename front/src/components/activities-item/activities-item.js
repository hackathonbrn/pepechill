import React from 'react';

import { Panel, Progress, Icon, FlexboxGrid } from 'rsuite';

import { getStore } from '../../stores/user';

import './activities-item.css';

const store = getStore();

const ActivitiesItem = props => {
  const { Line } = Progress;
  const { caption, text, target, users } = props;

  const userData = users.find(item => item.username === store.user.username);

  return (
    <Panel onSelect={e => console.log(e)} bordered header={caption} className="activities_item">
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={11}>
          <p>{text}</p>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={1}>
          <Icon icon="peoples" />
          <span>{users.length}</span>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Line percent={[target]} status="active" />
    </Panel>
  );
};

export default ActivitiesItem;
