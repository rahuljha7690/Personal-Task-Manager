// api/tasks.js
import axios from 'axios';

const BASE = '/api/tasks';

export const fetchTasks = (status) => {
  const params = status && status !== 'all' ? { status } : {};
  return axios.get(BASE, { params }).then((res) => res.data);
};

export const createTask = (data) =>
  axios.post(BASE, data).then((res) => res.data);

export const updateTask = (id, data) =>
  axios.patch(`${BASE}/${id}`, data).then((res) => res.data);

export const deleteTask = (id) =>
  axios.delete(`${BASE}/${id}`);