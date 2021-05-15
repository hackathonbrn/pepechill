import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col } from 'rsuite';

import ActivitiesItem from '../activities-item';

import { getStore } from '../../stores/activities';

const store = getStore();

// const arr = [
//   { caption: 'Бросить пить', text: 'Хочу не пить следующие 54 года', progress: 2, peoplesCount: 4 },
//   { caption: 'Начать бегать', text: 'Хочу бегать миллион км следующие 54 года', progress: 23, peoplesCount: 23 },
//   { caption: 'Написать диплом', text: 'Написать сто страниц диплома', progress: 52, peoplesCount: 2 },
// ];

const ActivitiesList = observer(() => {
  useEffect(() => {
    store.getActivities();
  }, []);

  let arr = store.activities;
  console.log(arr);
  if (!arr) {
    return <h1>nichego</h1>;
  }

  return (
    <Row>
      {arr.map(el => {
        return (
          <Col key={el._id} md={6} sm={12}>
            <ActivitiesItem {...el} />
          </Col>
        );
      })}
    </Row>
  );
});

export default ActivitiesList;
