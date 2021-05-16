import React from 'react';
import { useHistory } from 'react-router-dom';
import { Panel, Progress, Icon, FlexboxGrid } from 'rsuite';

import { getStore } from '../../stores/user';

import './activities-item.css';

const store = getStore();

const ActivitiesItem = props => {
  const history = useHistory();

  const { Line } = Progress;
  const { _id, caption, text, target, users } = props;

  const userData = users.find(item => item.username === store.user.username);

  return (
    <Panel onSelect={() => history.push(`/activities/${_id}`)} bordered header={caption} className="activities_item">
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
