// api/tasks.js
import axios from 'axios';

// In production this is set to your Render backend URL.
// In development Vite proxy handles /api automatically.
const BASE_URL = import.meta.env.VITE_API_URL || '';

const BASE = `${BASE_URL}/api/tasks`;

export const fetchTasks = (status, search) => {
  const params = {};
  if (status && status !== 'all') params.status = status;
  if (search && search.trim() !== '') params.search = search.trim();
  return axios.get(BASE, { params }).then((res) => res.data);
};

export const createTask = (data) =>
  axios.post(BASE, data).then((res) => res.data);

export const updateTask = (id, data) =>
  axios.patch(`${BASE}/${id}`, data).then((res) => res.data);

export const deleteTask = (id) =>
  axios.delete(`${BASE}/${id}`);

export const reorderTasks = (orderedIds) =>
  axios.patch(`${BASE}/reorder/apply`, { orderedIds });