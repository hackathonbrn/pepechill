import { makeAutoObservable } from 'mobx';

import * as api from '../api/user';

class UserStore {
  _user = undefined;
  _loading = false;

  get user() {
    return this._user;
  }

  get loading() {
    return this._loading;
  }

  constructor() {
    makeAutoObservable(this);
  }

  async getUser() {
    let res;

    if (!localStorage.getItem('access-token')) return;
    this._loading = true;

    try {
      res = await api.getUser();
    } catch (error) {
      this._loading = false;
      return;
    }

    this._user = res;
    this._loading = false;
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('username');
  }
}

let store;

export function getStore() {
  if (!store) store = new UserStore();

  return store;
}
