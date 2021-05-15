import axios from 'axios';

// export async function updateTokens(data) {
//   const res = await axios.post('/api/update_tokens', data);

//   return res.data;
// }

export async function login(data) {
  const res = await axios.post('/api/login', data);

  return res.data;
}

export async function register(data) {
  const res = await axios.post('/api/register', data);

  return res.data;
}
