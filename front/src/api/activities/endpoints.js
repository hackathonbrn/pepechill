import axios from 'axios';

export async function getActivities() {
  const res = await axios.get('/api/challenges');

  return res.data;
}

export async function createActivity(data) {
  console.log(data);

  const res = await axios.post('/api/challenge', data);

  return res.data;
}
