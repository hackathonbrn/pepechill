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
  const res = await axios.post('/api/challenge/delete', data);

  return res.data;
}

export async function editActivity(data) {
  console.log(data);
  const res = await axios.put('/api/challenge', data);

  return res.data;
}
