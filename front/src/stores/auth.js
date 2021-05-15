import { makeAutoObservable } from 'mobx';
import axios from 'axios';

import * as api from '../api/auth';

import { getStore as getUserStore } from './user';

const userStore = getUserStore();

class AuthStore {
  _loading = false;

  get loading() {
    return this._loading;
  }

  async register(username, name, password) {
    this._loading = true;

    let res;

    try {
      res = await api.register({ username, name, password });
    } catch (error) {
      this._loading = false;
      return;
    }

    if (res.code === 200) {
      await this.login(username, password);
    }

    this._loading = false;
  }

  async login(username, password) {
    this._loading = true;

    let res;

    try {
      res = await api.login({ username, password });
    } catch (error) {
      this._loading = false;
      return;
    }
    localStorage.setItem('username', username);
    localStorage.setItem('access-token', res.accessToken);
    localStorage.setItem('refresh-token', res.refreshToken);

    axios.defaults.headers.common['Authorization'] = res.accessToken;

    await userStore.getUser();

    this._loading = false;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

let store;

export function getStore() {
  if (!store) store = new AuthStore();

  return store;
}
