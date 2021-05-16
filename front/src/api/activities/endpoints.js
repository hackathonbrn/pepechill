import axios from 'axios';

export async function getActivities() {
  const res = await axios.get('/api/challenges');

  return res.data;
}

export async function getActivity(data) {
  const res = await axios.get(`/api/challenge/?id=${data}`);

  return res.data;
}

export async function createActivity(data) {
  console.log(data);

  const res = await axios.post('/api/challenge', data);

  return res.data;
}

export async function deleteActivity(data) {
  console.log('del1', data);

  const res = await axios.post('/api/challenge/delete', data);
  console.log('RESULT', res);
  return res.data;
}
