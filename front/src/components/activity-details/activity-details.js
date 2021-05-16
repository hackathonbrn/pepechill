import React from 'react';
import { Panel, Progress, Icon, FlexboxGrid } from 'rsuite';

const ActivityDetails = ({ caption, text, target }) => {
  return (
    // <h1>DKFSOIDGNORGNOSNG</h1>
    <Panel bordered header={caption} className="activities_item">
      <FlexboxGrid justify="space-between">
        <FlexboxGrid.Item colspan={11}>
          <p>{text}</p>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={1}>
          <Icon icon="peoples" />
          {/* <span>{users.length}</span> */}
        </FlexboxGrid.Item>
      </FlexboxGrid>
      {/* <Line percent={[target]} status="active" /> */}
    </Panel>
  );
};

export default ActivityDetails;
