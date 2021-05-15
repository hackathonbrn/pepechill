import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './app';

import { API_ROOT } from './constants';

axios.defaults.baseURL = API_ROOT;

const accessToken = localStorage.getItem('access-token');

if (accessToken) axios.defaults.headers.common['Authorization'] = accessToken;

// const refreshAuthLogic = async (failedRequest ) => {
//   const tokens = await
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
