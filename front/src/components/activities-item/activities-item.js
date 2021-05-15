import React from 'react';

import { Panel, Progress, Icon, FlexboxGrid } from 'rsuite';

import './activities-item.css';

const ActivitiesItem = props => {
  const { Line } = Progress;
  const { caption, text, progress, peoplesCount } = props;

  return (
    <Panel bordered header={caption} className="activities_item">
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={11}>
          <p>{text}</p>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={1}>
          <Icon icon="peoples" />
          <span>{peoplesCount}</span>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Line percent={progress} status="active" />
    </Panel>
  );
};

export default ActivitiesItem;
