import React from 'react';
import { Redirect } from 'react-router-dom';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Row, Col } from 'rsuite';

import ActivitiesItem from '../activities-item';
import './activities-list.css';

import { getStore } from '../../stores/activities';

const store = getStore();

// const arr = [
//   { caption: 'Бросить пить', text: 'Хочу не пить следующие 54 года', progress: 2, peoplesCount: 4 },
//   { caption: 'Начать бегать', text: 'Хочу бегать миллион км следующие 54 года', progress: 23, peoplesCount: 23 },
//   { caption: 'Написать диплом', text: 'Написать сто страниц диплома', progress: 52, peoplesCount: 2 },
// ];

const ActivitiesList = observer(() => {
  if (!store.activities) runInAction(() => store.getActivities());

  let arr = store.activities;

  return (
    <Row className="activities-list">
      {arr
        ? arr.map(el => {
            return (
              <Col key={el._id} lg={6} md={12} sm={24}>
                <ActivitiesItem {...el} />
              </Col>
            );
          })
        : ''}
    </Row>
  );
});

export default ActivitiesList;
