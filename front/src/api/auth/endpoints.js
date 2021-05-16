import axios from 'axios';

export async function login(data) {
  const res = await axios.post('/api/login', data);

  return res.data;
}

export async function register(data) {
  const res = await axios.post('/api/register', data);

  return res.data;
}

export async function refresh(data) {
  const res = await axios.post('/api/refresh', data);

  return res.data;
}
