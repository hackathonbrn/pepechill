import { makeAutoObservable } from 'mobx';

import * as api from '../api/user';

class UserStore {
  _user = undefined;

  async getUser() {
    let res;

    try {
      res = await api.getUser();
    } catch (error) {
      return;
    }

    this._user = res;

    console.log(this._user);
  }

  get user() {
    return this._user;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

let store;

export function getStore() {
  if (!store) store = new UserStore();

  return store;
}
