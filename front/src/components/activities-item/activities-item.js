import React from 'react';

import { Button } from 'rsuite';

const ActivitiesItem = ({ name }) => {
  return <Button appearance="primary">{name}</Button>;
};

export default ActivitiesItem;
