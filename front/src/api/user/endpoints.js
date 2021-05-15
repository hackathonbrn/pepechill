import axios from 'axios';

export async function getUser() {
  const res = await axios.get('/api/user');

  return res.data;
}
