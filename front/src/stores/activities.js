import { makeAutoObservable } from 'mobx';

import * as api from '../api/activities';

class ActivitiesStore {
  _activity = undefined;
  _activities = undefined;
  _loading = false;

  get activities() {
    return this._activities;
  }

  get activity() {
    return this._activity;
  }

  get loading() {
    return this._loading;
  }

  async getActivities() {
    let res;

    this._loading = true;

    try {
      res = await api.getActivities();
    } catch (error) {
      this._loading = false;

      return;
    }

    this._activities = res;
    this._loading = false;
  }

  async getActivity(id) {
    let res;

    this._loading = true;

    try {
      res = await api.getActivity(id);
    } catch (error) {
      this._loading = false;

      return;
    }

    this._activity = res;
    this._loading = false;
  }

  async createActivity(data) {
    try {
      await api.createActivity(data);
    } catch (error) {
      return;
    }

    try {
      this.getActivities();
    } catch (error) {
      return;
    }
  }

  constructor() {
    makeAutoObservable(this, { _loading: false });
  }
}

let store;

export function getStore() {
  if (!store) store = new ActivitiesStore();

  return store;
}
