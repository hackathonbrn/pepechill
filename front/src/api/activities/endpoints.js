import axios from 'axios';

export async function getActivities() {
  const res = await axios.post('/api/challenges');

  return res.data;
}
