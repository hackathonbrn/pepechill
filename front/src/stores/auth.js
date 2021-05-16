import { makeAutoObservable } from 'mobx';
import axios from 'axios';

import * as api from '../api/auth';

import { getStore as getUserStore } from './user';
import { getStore as getActivitiesStore } from './activities';

const userStore = getUserStore();
const activitiesStore = getActivitiesStore();

class AuthStore {
  _loading = false;
  _refreshing = false;

  get loading() {
    return this._loading;
  }

  get authenticated() {
    return Boolean(userStore.user);
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
    await activitiesStore.getActivities();

    this._loading = false;
  }

  async refresh(topLevelError) {
    const { accessToken, refreshToken, username } = this.loadLocalData();

    if (accessToken && refreshToken && username && username !== userStore.user.username) {
      axios.defaults.headers.common['Authorization'] = accessToken;
    }

    if (!refreshToken) throw new Error('Could not load a refresh token');

    let tokens;

    try {
      tokens = api.refresh({ refreshToken, username });
    } catch (error) {
      userStore.logout();

      throw topLevelError ?? error;
    }

    localStorage.setItem('access-token', tokens.accessToken);
    localStorage.setItem('refresh-token', tokens.refreshToken);
    axios.defaults.headers.common['Authorization'] = accessToken;

    return tokens;
  }

  loadLocalData() {
    const username = localStorage.getItem('username');
    const accessToken = localStorage.getItem('access-token');
    const refreshToken = localStorage.getItem('refresh-token');

    return { username, accessToken, refreshToken };
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
