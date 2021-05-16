import { API_ROOT } from './constants';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './app';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { getStore } from './stores/auth';

const store = getStore();

axios.defaults.baseURL = API_ROOT;

const accessToken = localStorage.getItem('access-token');

if (accessToken) axios.defaults.headers.common['Authorization'] = accessToken;

const refreshAuthLogic = async failedRequest => {
  const tokens = store.refresh(failedRequest);
  console.log('test');
  failedRequest.response.config.headers['Authorization'] = tokens.accessToken;
};

createAuthRefreshInterceptor(axios, refreshAuthLogic);

ReactDOM.render(<App />, document.getElementById('root'));
