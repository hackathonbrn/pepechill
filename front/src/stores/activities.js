import { makeAutoObservable } from 'mobx';

import * as api from '../api/activities';

class ActivitiesStore {
  activities = undefined;

  async getActivities() {
    let res;

    try {
      res = await api.getActivities();
    } catch (error) {
      return;
    }

    this.activities = res;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

let store;

export function getStore() {
  if (!store) store = new ActivitiesStore();

  return store;
}
