import axios from 'axios';

export async function getActivities() {
  const res = await axios.get('/api/challenges');

  return res.data;
}
