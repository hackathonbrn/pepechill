import React from 'react';
import { Panel, Progress, Icon, FlexboxGrid } from 'rsuite';

import { getStore } from '../../stores/user';

import './activities-item.css';

const store = getStore();

const ActivitiesItem = props => {
  const { Line } = Progress;
  const { caption, text, target, users } = props;

  const userData = users.find(item => item.username === store.user.username);

  let percentage;

  if (!userData.records.length) {
    percentage = 0;
  } else {
    percentage = userData.records[userData.records.length - 1].value / target;
  }

  return (
    <Panel bordered header={caption} className="activities_item">
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={11}>
          <p>{text}</p>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={1}>
          <Icon icon="peoples" />
          <span>{users.length}</span>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Line percent={percentage} />
    </Panel>
  );
};

export default ActivitiesItem;
